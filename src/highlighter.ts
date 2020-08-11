import { Registry } from 'vscode-textmate'

import {
  TLang,
  commonLangIds,
  commonLangAliases,
  ILanguageRegistration,
  getLangRegistrations
} from 'shiki-languages'

import { Resolver } from './resolver'
import { getOniguruma } from './onigLibs'
import { tokenizeWithTheme, IThemedToken } from './themedTokenizer'
import { renderToHtml } from './renderer'

import { getTheme, TTheme, IShikiTheme } from 'shiki-themes'

export interface HighlighterOptions {
  theme: TTheme | IShikiTheme
  langs?: TLang[]
}

export interface HtmlOptions {
  // Pass an array of lines and line ranges (strikes like "4-18")
  highlightLines?: (string | number)[]
  addLines?: (string | number)[]
  deleteLines?: (string | number)[]
  // When debugColors is true, include token scope info in the HTML as data attributes
  debugColors?: boolean
}

export async function getHighlighter(options: HighlighterOptions) {
  let t: IShikiTheme
  if (typeof options.theme === 'string') {
    t = getTheme(options.theme)
  } else if (options.theme.name) {
    t = options.theme
  } else {
    t = getTheme('nord')
  }

  let langs: TLang[] = [...commonLangIds, ...commonLangAliases]

  if (options.langs) {
    langs = options.langs
  }

  const langRegistrations = getLangRegistrations(langs)

  const s = new Shiki(t, langRegistrations)
  return await s.getHighlighter()
}

class Shiki {
  private _resolver: Resolver
  private _registry: Registry

  private _theme: IShikiTheme
  private _colorMap: string[]
  private _langs: ILanguageRegistration[]

  constructor(theme: IShikiTheme, langs: ILanguageRegistration[]) {
    this._resolver = new Resolver(langs, getOniguruma(), 'oniguruma')
    this._registry = new Registry(this._resolver)

    this._registry.setTheme(theme)

    this._theme = theme
    this._colorMap = this._registry.getColorMap()

    this._langs = langs
  }

  async getHighlighter(): Promise<Highlighter> {
    const ltog = {}

    await Promise.all(
      this._langs.map(async l => {
        const g = await this._registry.loadGrammar(l.scopeName)
        ltog[l.id] = g
        l.aliases.forEach(la => {
          ltog[la] = g
        })
      })
    )

    return {
      codeToThemedTokens: (code, lang) => {
        if (isPlaintext(lang)) {
          throw Error('Cannot tokenize plaintext')
        }
        if (!ltog[lang]) {
          throw Error(`No language registration for ${lang}`)
        }
        return tokenizeWithTheme(this._theme, this._colorMap, code, ltog[lang])
      },
      codeToHtml: (code, lang, options) => {
        if (isPlaintext(lang)) {
          return renderToHtml([[{ content: code }]], {
            bg: this._theme.bg
          })
        }
        if (!ltog[lang]) {
          throw Error(`No language registration for ${lang}`)
        }

        const tokens = tokenizeWithTheme(
          this._theme,
          this._colorMap,
          code,
          ltog[lang],
          options?.debugColors
        )
        return renderToHtml(tokens, {
          langId: lang,
          bg: this._theme.bg,
          highlightLines: options?.highlightLines,
          addLines: options?.addLines,
          deleteLines: options?.deleteLines,
          debugColors: options?.debugColors
        })
      }
    }
  }
}

function isPlaintext(lang) {
  return ['plaintext', 'txt', 'text'].indexOf(lang) !== -1
}

export interface Highlighter {
  codeToThemedTokens(code: string, lang: TLang): IThemedToken[][]
  codeToHtml?(code: string, lang: TLang, options?: HtmlOptions): string

  // codeToRawHtml?(code: string): string
  // getRawCSS?(): string

  // codeToSVG?(): string
  // codeToImage?(): string
}

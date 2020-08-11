import { IThemedToken } from './themedTokenizer'

export interface HtmlRendererOptions {
  langId?: string
  bg?: string
  highlightLines?: (string | number)[]
  addLines?: (string | number)[]
  deleteLines?: (string | number)[]
  debugColors?: boolean
}

export function renderToHtml(lines: IThemedToken[][], options: HtmlRendererOptions = {}) {
  const bg = options.bg || '#fff'
  const highlightedLines = makeHighlightSet(options.highlightLines)
  const addLines = makeHighlightSet(options.addLines)
  const deleteLines = makeHighlightSet(options.deleteLines)

  let html = ''
  let className = 'shiki'
  if (highlightedLines.size) {
    className += ' highlighted'
  }
  if (addLines.size) {
    className += ' added'
  }
  if (deleteLines.size) {
    className += ' deleted'
  }

  html += `<pre class="${className}" style="background-color: ${bg}" data-language="${options.langId}">`
  html += `<code>`

  lines.forEach((l: any[], index: number) => {
    const lineNo = index + 1
    let isHighlighted = false
    if (highlightedLines.has(lineNo)) {
      html += `<span class="hl">`
      isHighlighted = true
    }
    if (addLines.has(lineNo)) {
      html += `<span class="add">`
      isHighlighted = true
    }
    if (deleteLines.has(lineNo)) {
      html += `<span class="del">`
      isHighlighted = true
    }

    if (l.length > 0) {
      l.forEach(token => {
        let debugInfo = ''
        if (options.debugColors) {
          const tokenScopes = token.explanation
            .map(ex => ex.scopes.map(s => s.scopeName).join(', '))
            .join('; ')
          const themeMatches = token.explanation
            .map(ex =>
              ex.scopes
                .map(s => s.themeMatches?.map(tm => tm.name).join(','))
                .filter(Boolean)
                .join('; ')
            )
            .filter(Boolean)
            .join(' | ')
          debugInfo = ` data-token-scopes="${tokenScopes}" data-theme-matches="${themeMatches}"`
        }
        html += `<span style="color: ${token.color}"${debugInfo}>${escapeHtml(
          token.content
        )}</span>`
      })
    }

    if (isHighlighted) {
      // Newline goes before the close, so that display:block on the line will work
      html += `\n</span>`
    } else {
      html += `\n`
    }
  })
  html = html.replace(/\n*$/, '') // Get rid of final new lines
  html += `</code></pre>`

  return html
}

function commaSeparatedLinesToArray(lineList: string) {
  return lineList.split(',').map(segment => {
    if (Number(segment) > 0) {
      return Number(segment)
    }
    return segment
  })
}

export function makeHighlightSet(highlightLines?: (string | number)[]): Set<number> {
  const lines = new Set<number>()

  if (!highlightLines) {
    return lines
  }

  for (let lineSpec of highlightLines) {
    if (typeof lineSpec === 'number') {
      lines.add(lineSpec)
    } else if (lineSpec.includes('-')) {
      const [begin, end] = lineSpec.split('-').map(lineNo => Number(lineNo))
      for (let line = begin; line <= end; line++) {
        lines.add(line)
      }
    }
  }

  return lines
}

function escapeHtml(html: string) {
  return (
    html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      //.replace(/&/g, '&amp;')  // why do this twice?
      .replace(/'/g, '&apos;')
  )
}

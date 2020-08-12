import { TLang } from 'shiki-languages';
import { IThemedToken } from './themedTokenizer';
import { TTheme, IShikiTheme } from 'shiki-themes';
export interface HighlighterOptions {
    theme: TTheme | IShikiTheme;
    langs?: TLang[];
}
export interface HtmlOptions {
    highlightLines?: (string | number)[];
    addLines?: (string | number)[];
    deleteLines?: (string | number)[];
    focusLines?: (string | number)[];
    debugColors?: boolean;
}
export declare function getHighlighter(options: HighlighterOptions): Promise<Highlighter>;
export interface Highlighter {
    codeToThemedTokens(code: string, lang: TLang): IThemedToken[][];
    codeToHtml?(code: string, lang: TLang, options?: HtmlOptions): string;
}

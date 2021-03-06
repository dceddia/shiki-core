import { IThemedToken } from './themedTokenizer';
export interface HtmlRendererOptions {
    langId?: string;
    bg?: string;
    fg?: string;
    highlightLines?: (string | number)[];
    addLines?: (string | number)[];
    deleteLines?: (string | number)[];
    focusLines?: (string | number)[];
    debugColors?: boolean;
}
export declare function renderToHtml(lines: IThemedToken[][], options?: HtmlRendererOptions): string;
export declare function makeHighlightSet(highlightLines?: (string | number)[]): Set<number>;

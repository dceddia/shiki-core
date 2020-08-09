import { IThemedToken } from './themedTokenizer';
export interface HtmlRendererOptions {
    langId?: string;
    bg?: string;
    highlightLines?: (string | number)[];
    debugColors?: boolean;
}
export declare function renderToHtml(lines: IThemedToken[][], options?: HtmlRendererOptions): string;

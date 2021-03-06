import { IGrammar, IRawTheme, IRawThemeSetting } from 'vscode-textmate';
export interface IThemedTokenScopeExplanation {
    scopeName: string;
    themeMatches: IRawThemeSetting[];
}
export interface IThemedTokenExplanation {
    content: string;
    scopes: IThemedTokenScopeExplanation[];
}
export interface IThemedToken {
    content: string;
    color?: string;
    explanation?: IThemedTokenExplanation[];
}
export declare function tokenizeWithTheme(theme: IRawTheme, colorMap: string[], fileContents: string, grammar: IGrammar, includeExplanations?: boolean, ignoreLines?: Set<number>): IThemedToken[][];

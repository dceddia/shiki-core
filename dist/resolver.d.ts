import { IRawGrammar, IOnigLib, RegistryOptions } from 'vscode-textmate';
import { ILanguageRegistration } from 'shiki-languages';
export declare class Resolver implements RegistryOptions {
    private readonly langMap;
    private readonly scopeToLangMap;
    private readonly _languages;
    private readonly _onigLib;
    private readonly _onigLibName;
    constructor(languages: ILanguageRegistration[], onigLibPromise: Promise<IOnigLib>, onigLibName: string);
    getOnigLib(): Promise<IOnigLib>;
    get onigLib(): Promise<IOnigLib>;
    getOnigLibName(): string;
    getLangRegistration(langIdOrAlias: string): ILanguageRegistration;
    loadGrammar(scopeName: string): Promise<IRawGrammar>;
}

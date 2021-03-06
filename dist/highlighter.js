"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHighlighter = void 0;
var vscode_textmate_1 = require("vscode-textmate");
var shiki_languages_1 = require("shiki-languages");
var resolver_1 = require("./resolver");
var onigLibs_1 = require("./onigLibs");
var themedTokenizer_1 = require("./themedTokenizer");
var renderer_1 = require("./renderer");
var shiki_themes_1 = require("shiki-themes");
function getHighlighter(options) {
    return __awaiter(this, void 0, void 0, function () {
        var t, langs, langRegistrations, s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof options.theme === 'string') {
                        t = shiki_themes_1.getTheme(options.theme);
                    }
                    else if (options.theme.name) {
                        t = options.theme;
                    }
                    else {
                        t = shiki_themes_1.getTheme('nord');
                    }
                    langs = __spreadArrays(shiki_languages_1.commonLangIds, shiki_languages_1.commonLangAliases);
                    if (options.langs) {
                        langs = options.langs;
                    }
                    langRegistrations = shiki_languages_1.getLangRegistrations(langs);
                    s = new Shiki(t, langRegistrations);
                    return [4 /*yield*/, s.getHighlighter()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getHighlighter = getHighlighter;
var Shiki = /** @class */ (function () {
    function Shiki(theme, langs) {
        this._resolver = new resolver_1.Resolver(langs, onigLibs_1.getOniguruma(), 'oniguruma');
        this._registry = new vscode_textmate_1.Registry(this._resolver);
        this._registry.setTheme(theme);
        this._theme = theme;
        this._colorMap = this._registry.getColorMap();
        this._langs = langs;
    }
    Shiki.prototype.getHighlighter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ltog;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ltog = {};
                        return [4 /*yield*/, Promise.all(this._langs.map(function (l) { return __awaiter(_this, void 0, void 0, function () {
                                var g;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this._registry.loadGrammar(l.scopeName)];
                                        case 1:
                                            g = _a.sent();
                                            ltog[l.id] = g;
                                            l.aliases.forEach(function (la) {
                                                ltog[la] = g;
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                codeToThemedTokens: function (code, lang) {
                                    if (isPlaintext(lang)) {
                                        throw Error('Cannot tokenize plaintext');
                                    }
                                    if (!ltog[lang]) {
                                        throw Error("No language registration for " + lang);
                                    }
                                    return themedTokenizer_1.tokenizeWithTheme(_this._theme, _this._colorMap, code, ltog[lang]);
                                },
                                codeToHtml: function (code, lang, options) {
                                    if (isPlaintext(lang)) {
                                        return renderer_1.renderToHtml([[{ content: code }]], {
                                            bg: _this._theme.bg,
                                            fg: _this._theme.fg
                                        });
                                    }
                                    if (!ltog[lang]) {
                                        throw Error("No language registration for " + lang);
                                    }
                                    var tokens = themedTokenizer_1.tokenizeWithTheme(_this._theme, _this._colorMap, code, ltog[lang], options === null || options === void 0 ? void 0 : options.debugColors, 
                                    // Exclude deleted lines from highlighting, so they don't mess up the surrounding lines
                                    (options === null || options === void 0 ? void 0 : options.deleteLines) ? renderer_1.makeHighlightSet(options.deleteLines) : new Set());
                                    return renderer_1.renderToHtml(tokens, {
                                        langId: lang,
                                        bg: _this._theme.bg,
                                        fg: _this._theme.fg,
                                        highlightLines: options === null || options === void 0 ? void 0 : options.highlightLines,
                                        addLines: options === null || options === void 0 ? void 0 : options.addLines,
                                        deleteLines: options === null || options === void 0 ? void 0 : options.deleteLines,
                                        focusLines: options === null || options === void 0 ? void 0 : options.focusLines,
                                        debugColors: options === null || options === void 0 ? void 0 : options.debugColors
                                    });
                                }
                            }];
                }
            });
        });
    };
    return Shiki;
}());
function isPlaintext(lang) {
    return ['plaintext', 'txt', 'text'].indexOf(lang) !== -1;
}

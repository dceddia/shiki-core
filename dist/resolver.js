/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
var vscode_textmate_1 = require("vscode-textmate");
var fs = require("fs");
var Resolver = /** @class */ (function () {
    function Resolver(languages, onigLibPromise, onigLibName) {
        var _this = this;
        this.langMap = {};
        this.scopeToLangMap = {};
        this._languages = languages;
        this._onigLib = onigLibPromise;
        this._onigLibName = onigLibName;
        this._languages.forEach(function (l) {
            _this.langMap[l.id] = l;
            l.aliases.forEach(function (a) {
                _this.langMap[a] = l;
            });
            _this.scopeToLangMap[l.scopeName] = l;
        });
    }
    Resolver.prototype.getOnigLib = function () {
        return this._onigLib;
    };
    Object.defineProperty(Resolver.prototype, "onigLib", {
        get: function () {
            return this._onigLib;
        },
        enumerable: false,
        configurable: true
    });
    Resolver.prototype.getOnigLibName = function () {
        return this._onigLibName;
    };
    Resolver.prototype.getLangRegistration = function (langIdOrAlias) {
        return this.langMap[langIdOrAlias];
    };
    Resolver.prototype.loadGrammar = function (scopeName) {
        return __awaiter(this, void 0, void 0, function () {
            var lang, g;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lang = this.scopeToLangMap[scopeName];
                        if (!lang) {
                            return [2 /*return*/, null];
                        }
                        if (lang.grammar) {
                            return [2 /*return*/, lang.grammar];
                        }
                        return [4 /*yield*/, readGrammarFromPath(lang.path)];
                    case 1:
                        g = _a.sent();
                        lang.grammar = g;
                        return [2 /*return*/, g];
                }
            });
        });
    };
    return Resolver;
}());
exports.Resolver = Resolver;
function readGrammarFromPath(path) {
    return new Promise(function (c, e) {
        fs.readFile(path, function (error, content) {
            if (error) {
                e(error);
            }
            else {
                c(vscode_textmate_1.parseRawGrammar(content.toString(), path));
            }
        });
    });
}

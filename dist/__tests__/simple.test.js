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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
test('Nord highlighter highlights simple JavaScript', function () { return __awaiter(void 0, void 0, void 0, function () {
    var highlighter, out;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.getHighlighter({
                    theme: 'nord'
                })];
            case 1:
                highlighter = _a.sent();
                out = highlighter.codeToHtml("console.log('shiki');", 'js');
                expect(out).toBe("<pre class=\"shiki\" style=\"background-color: #2e3440\"><code><span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #A3BE8C\">shiki</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></code></pre>");
                return [2 /*return*/];
        }
    });
}); });
test('Individual lines are highlighted', function () { return __awaiter(void 0, void 0, void 0, function () {
    var highlighter, code, out;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.getHighlighter({
                    theme: 'nord'
                })];
            case 1:
                highlighter = _a.sent();
                code = "\nlet a = 1;\nlet b = 2;\nconsole.log(a+b);\nconsole.log('shiki');\n";
                out = highlighter.codeToHtml(code, 'js', { highlightLines: [2, 4] });
                expect(out).toBe("<pre class=\"shiki highlighted\" style=\"background-color: #2e3440\"><code>\n<span class=\"hl\"><span style=\"color: #81A1C1\">let</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #D8DEE9\">a</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #81A1C1\">=</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #B48EAD\">1</span><span style=\"color: #81A1C1\">;</span></span>\n<span style=\"color: #81A1C1\">let</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #D8DEE9\">b</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #81A1C1\">=</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #B48EAD\">2</span><span style=\"color: #81A1C1\">;</span>\n<span class=\"hl\"><span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #D8DEE9\">a</span><span style=\"color: #81A1C1\">+</span><span style=\"color: #D8DEE9\">b</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></span>\n<span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #A3BE8C\">shiki</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></code></pre>");
                return [2 /*return*/];
        }
    });
}); });
test('Line ranges are highlighted', function () { return __awaiter(void 0, void 0, void 0, function () {
    var highlighter, code, out;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.getHighlighter({
                    theme: 'nord'
                })];
            case 1:
                highlighter = _a.sent();
                code = "let a = 1;\nlet b = 2;\nconsole.log(a+b);\nconsole.log('shiki');\n";
                out = highlighter.codeToHtml(code, 'js', { highlightLines: ['1-3'] });
                expect(out).toBe("<pre class=\"shiki highlighted\" style=\"background-color: #2e3440\"><code><span class=\"hl\"><span style=\"color: #81A1C1\">let</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #D8DEE9\">a</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #81A1C1\">=</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #B48EAD\">1</span><span style=\"color: #81A1C1\">;</span></span>\n<span class=\"hl\"><span style=\"color: #81A1C1\">let</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #D8DEE9\">b</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #81A1C1\">=</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #B48EAD\">2</span><span style=\"color: #81A1C1\">;</span></span>\n<span class=\"hl\"><span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #D8DEE9\">a</span><span style=\"color: #81A1C1\">+</span><span style=\"color: #D8DEE9\">b</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></span>\n<span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #A3BE8C\">shiki</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></code></pre>");
                return [2 /*return*/];
        }
    });
}); });
test('Combinations of lines are highlighted', function () { return __awaiter(void 0, void 0, void 0, function () {
    var highlighter, code, out;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.getHighlighter({
                    theme: 'nord'
                })];
            case 1:
                highlighter = _a.sent();
                code = "let a = 1;\nlet b = 2;\nconsole.log(a+b);\nconsole.log('shiki');\n";
                out = highlighter.codeToHtml(code, 'js', { highlightLines: [1, '3-4'] });
                expect(out).toBe("<pre class=\"shiki highlighted\" style=\"background-color: #2e3440\"><code><span class=\"hl\"><span style=\"color: #81A1C1\">let</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #D8DEE9\">a</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #81A1C1\">=</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #B48EAD\">1</span><span style=\"color: #81A1C1\">;</span></span>\n<span style=\"color: #81A1C1\">let</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #D8DEE9\">b</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #81A1C1\">=</span><span style=\"color: #D8DEE9FF\"> </span><span style=\"color: #B48EAD\">2</span><span style=\"color: #81A1C1\">;</span>\n<span class=\"hl\"><span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #D8DEE9\">a</span><span style=\"color: #81A1C1\">+</span><span style=\"color: #D8DEE9\">b</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></span>\n<span class=\"hl\"><span style=\"color: #8FBCBB\">console</span><span style=\"color: #ECEFF4\">.</span><span style=\"color: #88C0D0\">log</span><span style=\"color: #D8DEE9FF\">(</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #A3BE8C\">shiki</span><span style=\"color: #ECEFF4\">&apos;</span><span style=\"color: #D8DEE9FF\">)</span><span style=\"color: #81A1C1\">;</span></span></code></pre>");
                return [2 /*return*/];
        }
    });
}); });

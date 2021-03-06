/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeWithTheme = void 0;
var stackElementMetadata_1 = require("./stackElementMetadata");
function tokenizeWithTheme(theme, colorMap, fileContents, grammar, includeExplanations, ignoreLines) {
    if (includeExplanations === void 0) { includeExplanations = true; }
    if (ignoreLines === void 0) { ignoreLines = new Set(); }
    var lines = fileContents.split(/\r\n|\r|\n/);
    var ruleStack = null;
    var actual = [];
    var final = [];
    for (var i = 0, len = lines.length; i < len; i++) {
        var line = lines[i];
        if (line === '') {
            actual = [];
            final.push([]);
            continue;
        }
        // If this line should be ignored (e.g. it's a removed line in a diff),
        // don't tokenize it, but do include it in the result.
        // Also - ignoreLines is 1-based
        if (ignoreLines.has(i + 1)) {
            final.push([
                {
                    content: line,
                    color: '',
                    explanation: []
                }
            ]);
            continue;
        }
        var resultWithScopes = grammar.tokenizeLine(line, ruleStack);
        var tokensWithScopes = resultWithScopes.tokens;
        var result = grammar.tokenizeLine2(line, ruleStack);
        var tokensLength = result.tokens.length / 2;
        var tokensWithScopesIndex = 0;
        for (var j = 0; j < tokensLength; j++) {
            var startIndex = result.tokens[2 * j];
            var nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
            if (startIndex === nextStartIndex) {
                continue;
            }
            var metadata = result.tokens[2 * j + 1];
            var foreground = stackElementMetadata_1.StackElementMetadata.getForeground(metadata);
            var foregroundColor = colorMap[foreground];
            var explanation = [];
            if (includeExplanations) {
                var offset = 0;
                while (startIndex + offset < nextStartIndex) {
                    var tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
                    var tokenWithScopesText = line.substring(tokenWithScopes.startIndex, tokenWithScopes.endIndex);
                    offset += tokenWithScopesText.length;
                    explanation.push({
                        content: tokenWithScopesText,
                        scopes: explainThemeScopes(theme, tokenWithScopes.scopes)
                    });
                    tokensWithScopesIndex++;
                }
            }
            actual.push({
                content: line.substring(startIndex, nextStartIndex),
                color: foregroundColor,
                explanation: explanation
            });
        }
        final.push(actual);
        actual = [];
        ruleStack = result.ruleStack;
    }
    return final;
}
exports.tokenizeWithTheme = tokenizeWithTheme;
function explainThemeScopes(theme, scopes) {
    var result = [];
    for (var i = 0, len = scopes.length; i < len; i++) {
        var parentScopes = scopes.slice(0, i);
        var scope = scopes[i];
        result[i] = {
            scopeName: scope,
            themeMatches: explainThemeScope(theme, scope, parentScopes)
        };
    }
    return result;
}
function matchesOne(selector, scope) {
    var selectorPrefix = selector + '.';
    if (selector === scope || scope.substring(0, selectorPrefix.length) === selectorPrefix) {
        return true;
    }
    return false;
}
function matches(selector, selectorParentScopes, scope, parentScopes) {
    if (!matchesOne(selector, scope)) {
        return false;
    }
    var selectorParentIndex = selectorParentScopes.length - 1;
    var parentIndex = parentScopes.length - 1;
    while (selectorParentIndex >= 0 && parentIndex >= 0) {
        if (matchesOne(selectorParentScopes[selectorParentIndex], parentScopes[parentIndex])) {
            selectorParentIndex--;
        }
        parentIndex--;
    }
    if (selectorParentIndex === -1) {
        return true;
    }
    return false;
}
function explainThemeScope(theme, scope, parentScopes) {
    var result = [], resultLen = 0;
    for (var i = 0, len = theme.settings.length; i < len; i++) {
        var setting = theme.settings[i];
        var selectors = void 0;
        if (typeof setting.scope === 'string') {
            selectors = setting.scope.split(/,/).map(function (scope) { return scope.trim(); });
        }
        else if (Array.isArray(setting.scope)) {
            selectors = setting.scope;
        }
        else {
            continue;
        }
        for (var j = 0, lenJ = selectors.length; j < lenJ; j++) {
            var rawSelector = selectors[j];
            var rawSelectorPieces = rawSelector.split(/ /);
            var selector = rawSelectorPieces[rawSelectorPieces.length - 1];
            var selectorParentScopes = rawSelectorPieces.slice(0, rawSelectorPieces.length - 1);
            if (matches(selector, selectorParentScopes, scope, parentScopes)) {
                // match!
                result[resultLen++] = setting;
                // break the loop
                j = lenJ;
            }
        }
    }
    return result;
}

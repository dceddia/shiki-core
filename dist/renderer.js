"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHighlightSet = exports.renderToHtml = void 0;
function renderToHtml(lines, options) {
    if (options === void 0) { options = {}; }
    var bg = options.bg || '#fff';
    var fg = options.fg || '#000';
    var highlightedLines = makeHighlightSet(options.highlightLines);
    var addLines = makeHighlightSet(options.addLines);
    var deleteLines = makeHighlightSet(options.deleteLines);
    var focusLines = makeHighlightSet(options.focusLines);
    var html = '';
    var className = 'shiki';
    if (highlightedLines.size) {
        className += ' highlighted';
    }
    if (addLines.size) {
        className += ' added';
    }
    if (deleteLines.size) {
        className += ' deleted';
    }
    if (focusLines.size) {
        className += ' has-focus';
    }
    html += "<pre class=\"" + className + "\" style=\"background-color: " + bg + "; color: " + fg + "\" data-language=\"" + options.langId + "\">";
    html += "<code>";
    lines.forEach(function (l, index) {
        var lineNo = index + 1;
        var highlightClasses = '';
        if (highlightedLines.has(lineNo)) {
            highlightClasses += ' hl';
        }
        if (addLines.has(lineNo)) {
            highlightClasses += ' add';
        }
        if (deleteLines.has(lineNo)) {
            highlightClasses += ' del';
        }
        if (focusLines.has(lineNo)) {
            highlightClasses += ' foc';
        }
        if (highlightClasses) {
            html += "<span class=\"" + highlightClasses.trim() + "\">";
        }
        if (l.length > 0) {
            l.forEach(function (token) {
                var debugInfo = '';
                if (options.debugColors) {
                    var tokenScopes = token.explanation
                        .map(function (ex) { return ex.scopes.map(function (s) { return s.scopeName; }).join(', '); })
                        .join('; ');
                    var themeMatches = token.explanation
                        .map(function (ex) {
                        return ex.scopes
                            .map(function (s) { var _a; return (_a = s.themeMatches) === null || _a === void 0 ? void 0 : _a.map(function (tm) { return tm.name; }).join(','); })
                            .filter(Boolean)
                            .join('; ');
                    })
                        .filter(Boolean)
                        .join(' | ');
                    debugInfo = " data-token-scopes=\"" + tokenScopes + "\" data-theme-matches=\"" + themeMatches + "\"";
                }
                html += "<span style=\"color: " + token.color + "\"" + debugInfo + ">" + escapeHtml(token.content) + "</span>";
            });
        }
        if (highlightClasses) {
            // Newline goes before the close, so that display:block on the line will work
            html += "\n</span>";
        }
        else {
            html += "\n";
        }
    });
    html = html.replace(/\n*$/, ''); // Get rid of final new lines
    html += "</code></pre>";
    return html;
}
exports.renderToHtml = renderToHtml;
function commaSeparatedLinesToArray(lineList) {
    return lineList.split(',').map(function (segment) {
        if (Number(segment) > 0) {
            return Number(segment);
        }
        return segment;
    });
}
function makeHighlightSet(highlightLines) {
    var lines = new Set();
    if (!highlightLines) {
        return lines;
    }
    for (var _i = 0, highlightLines_1 = highlightLines; _i < highlightLines_1.length; _i++) {
        var lineSpec = highlightLines_1[_i];
        if (typeof lineSpec === 'number') {
            lines.add(lineSpec);
        }
        else if (lineSpec.includes('-')) {
            var _a = lineSpec.split('-').map(function (lineNo) { return Number(lineNo); }), begin = _a[0], end = _a[1];
            for (var line = begin; line <= end; line++) {
                lines.add(line);
            }
        }
    }
    return lines;
}
exports.makeHighlightSet = makeHighlightSet;
function escapeHtml(html) {
    return (html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        //.replace(/&/g, '&amp;')  // why do this twice?
        .replace(/'/g, '&apos;'));
}

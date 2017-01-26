'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (css) {
    return '\n        \n(function () {\n            var style = document.createElement(\'style\');\n            style.innerText = \'' + css.replace(/\n/g, '') + '\';\n            document.querySelector(\'head\').appendChild(style);\n        })();\n\n    ';
};
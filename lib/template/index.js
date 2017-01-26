'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (template) {
    var useStrict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var renderObj = (0, _vueTemplateCompiler.compile)(template);
    var render = renderObj.render;
    var staticRenderFns = renderObj.staticRenderFns;

    var result = '\n        \nmodule.exports = {\n            render: function () {\n                ' + render + '\n            },\n            staticRenderFns: [\n                ' + staticRenderFns.map(toFunction).join(',') + '\n            ]\n        };\n\n    ';

    useStrict && (result = (0, _vueTemplateEs2015Compiler2.default)(result));

    return result;
};

var _vueTemplateCompiler = require('vue-template-compiler');

var _vueTemplateEs2015Compiler = require('vue-template-es2015-compiler');

var _vueTemplateEs2015Compiler2 = _interopRequireDefault(_vueTemplateEs2015Compiler);

var _jsBeautify = require('js-beautify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * wrap code with function
 *
 * @param {string} code function content
 * @return {string} function string
 */
function toFunction(code) {
    return '\n        function () {\n            ' + (0, _jsBeautify.js_beautify)(code) + '\n        }\n    ';
}

/**
 * compile vue template to be render & staticRenderFns functions
 *
 * @param {string} template vue template string
 * @param {boolean=} useStrict whether to use strict mode
 * @return {string} a string that is an object which has render and
 *                  staticRenderFns property attached to module.exports
 */
/**
 * @file make vue template string to render function string
 * @author JoeRay61(joeray199261@gmail.com)
 */
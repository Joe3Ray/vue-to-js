'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBlocks = getBlocks;
exports.generateCode = generateCode;
exports.compile = compile;

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _script = require('./script');

var _script2 = _interopRequireDefault(_script);

var _fs = require('fs');

var _path = require('path');

var _vueTemplateCompiler = require('vue-template-compiler');

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _jsBeautify = require('js-beautify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * parse .vue content to an object with all blocks' code
 * @param {string} filepath the path of .vue file
 * 
 * @return {Object} an object with all blocks' code
 */
/**
 * @file compile .vue to .js
 * @author JoeRay61(joeray199261@gmail.com)
 */

function getBlocks(filepath) {
    if (!filepath) {
        return;
    }
    var content = (0, _fs.readFileSync)(filepath, 'utf8');
    var result = (0, _vueTemplateCompiler.parseComponent)(content);
    var ret = {
        template: {
            code: result.template.content
        },
        script: {
            code: result.script.content
        },
        styles: []
    };
    result.styles.forEach(function (e, i) {
        ret.styles[i] = {
            code: e.content
        };
    });
    result.customBlocks.forEach(function (e, i) {
        var type = e.type;
        ret[type] = ret[type] || [];
        ret[type].push({
            code: e.content
        });
    });
    return ret;
}

/**
 * compile vue file to js code
 *
 * @param {string} filepath the path of .vue file
 * @param {string} mode the output mode, it should be
 *                      one of amd/commonjs/global/umd
 * @return {string} js code with appointed mode
 */
function generateCode(filepath) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'amd';


    // support 4 types of output as follows:
    // amd/commonjs/global/umd
    var choice = {
        amd: {
            prefix: 'define([\'module\', \'exports\'], function (module, exports) {',
            suffix: '});'
        },
        commonjs: {
            prefix: '',
            suffix: ''
        },
        global: {
            prefix: '(function (module, exports) {',
            suffix: '})(this, this.exports = this.exports || {});'
        },
        umd: {
            prefix: '\n                (function (global, factory) {\n                    typeof exports === \'object\' && typeof module !== \'undefined\' ? factory(module, exports) :\n                    typeof define === \'function\' && define.amd ? define([\'module\', \'exports\'], factory) :\n                    (factory(global, global.exports = global.exports || {}));\n                }(this, (function (module, exports) {\n            ',
            suffix: '})));'

        }
    };

    var _ref = choice[mode] || choice.amd,
        prefix = _ref.prefix,
        suffix = _ref.suffix;
    //const content = readFileSync(filepath, 'utf8');
    //const result = parseComponent(content);


    var result = getBlocks(filepath);
    var templateCode = result.template.code;
    var styleCode = result.styles.map(function (style) {
        return (0, _style2.default)(style.code);
    }).join('\n');
    var scriptCode = result.script.code;

    var code = '\n        ' + prefix + '\n            /* append style */\n            ' + styleCode + '\n\n            /* get render function */\n            var _module1 = {\n                exports: {}\n            };\n            (function (module, exports) {\n                ' + (0, _template2.default)(templateCode) + '\n            })(_module1, _module1.exports);\n\n            /* get script output data */\n            var _module2 = {\n                exports: {}\n            };\n            (function (module, exports) {\n                ' + (0, _script2.default)(scriptCode) + '\n            })(_module2, _module2.exports);\n\n            var obj = _module2.exports.default || _module2.exports;\n            obj.render = _module1.exports.render;\n            obj.staticRenderFns = _module1.exports.staticRenderFns;\n\n            module.exports = obj;\n        ' + suffix + '\n    ';

    return (0, _jsBeautify.js_beautify)(code);
}

/**
 * compile .vue to .js with appointed destination directory
 *
 * @param {Object} options compile config info
 * @param {string} options.resource glob pattern file path
 * @param {string} options.dest output destination directory
 * @param {string} options.mode one of amd/commonjs/umd/global
 */
function compile(_ref2) {
    var resource = _ref2.resource,
        dest = _ref2.dest,
        mode = _ref2.mode;

    dest = dest || 'dest';
    resource = resource || '*.vue';
    mode = ['amd', 'commonjs', 'umd', 'global'].indexOf(mode) > -1 ? mode : 'amd';
    if ((0, _fs.existsSync)(dest)) {
        if (!(0, _fs.statSync)(dest).isDirectory()) {
            throw new Error('the destination path is already exist and it is not a directory');
        }
    } else {
        (0, _fs.mkdirSync)(dest);
    }

    var files = _glob2.default.sync(resource);
    files.forEach(function (file) {
        var name = (0, _path.parse)(file).name;
        try {
            var code = generateCode(file, mode);
            var outputPath = (0, _path.format)({
                dir: dest,
                name: name,
                ext: '.js'
            });
            (0, _fs.writeFileSync)(outputPath, code);
        } catch (e) {
            throw e;
        }
    });
}
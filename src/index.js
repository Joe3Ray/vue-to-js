/**
 * @file compile .vue to .js
 * @author JoeRay61(joeray199261@gmail.com)
 */

import getRender from './template';
import appendStyle from './style';
import getScript from './script';
import {readFileSync, statSync, existsSync, mkdirSync, writeFileSync} from 'fs';
import {parse, format} from 'path';
import {parseComponent} from 'vue-template-compiler';
import glob from 'glob';
import {js_beautify} from 'js-beautify';

/**
 * parse .vue content to an object with all blocks' code
 * @param {string} filepath the path of .vue file
 * 
 * @return {Object} an object with all blocks' code
 */
export function getBlocks(filepath) {
    if (!filepath) {
        return;
    }
    const content = readFileSync(filepath, 'utf8');
    const result = parseComponent(content);
    var ret = {
        template: {
            code: result.template.content
        },
        script: {
            code: result.script.content
        },
        styles: []
    };
    result.styles.forEach((e, i) => {
        ret.styles[i] = {
            code: e.content
        };
    });
    result.customBlocks.forEach((e, i) => {
        let type = e.type;
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
export function generateCode(filepath, mode = 'amd') {

    // support 4 types of output as follows:
    // amd/commonjs/global/umd
    const choice = {
        amd: {
            prefix: `define(['module', 'exports'], function (module, exports) {`,
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
            prefix: `
                (function (global, factory) {
                    typeof exports === 'object' && typeof module !== 'undefined' ? factory(module, exports) :
                    typeof define === 'function' && define.amd ? define(['module', 'exports'], factory) :
                    (factory(global, global.exports = global.exports || {}));
                }(this, (function (module, exports) {
            `,
            suffix: '})));'

        }
    };

    let {prefix, suffix} = choice[mode] || choice.amd;
    //const content = readFileSync(filepath, 'utf8');
    //const result = parseComponent(content);
    let result = getBlocks(filepath);
    let templateCode = result.template.code;
    let styleCode = result.styles.map(style => appendStyle(style.code)).join('\n');
    let scriptCode = result.script.code;

    let code = `
        ${prefix}
            /* append style */
            ${styleCode}

            /* get render function */
            var _module1 = {
                exports: {}
            };
            (function (module, exports) {
                ${getRender(templateCode)}
            })(_module1, _module1.exports);

            /* get script output data */
            var _module2 = {
                exports: {}
            };
            (function (module, exports) {
                ${getScript(scriptCode)}
            })(_module2, _module2.exports);

            var obj = _module2.exports.default || _module2.exports;
            obj.render = _module1.exports.render;
            obj.staticRenderFns = _module1.exports.staticRenderFns;

            module.exports = obj;
        ${suffix}
    `;

    return js_beautify(code);
}

/**
 * compile .vue to .js with appointed destination directory
 *
 * @param {Object} options compile config info
 * @param {string} options.resource glob pattern file path
 * @param {string} options.dest output destination directory
 * @param {string} options.mode one of amd/commonjs/umd/global
 */
export function compile({resource, dest, mode}) {
    dest = dest || 'dest';
    resource = resource || '*.vue';
    mode = ['amd', 'commonjs', 'umd', 'global'].indexOf(mode) > -1 ? mode : 'amd';
    if (existsSync(dest)) {
        if (!statSync(dest).isDirectory()) {
            throw new Error('the destination path is already exist and it is not a directory');
        }
    }
    else {
        mkdirSync(dest);
    }

    const files = glob.sync(resource);
    files.forEach(file => {
        let name = parse(file).name;
        try {
            let code = generateCode(file, mode);
            let outputPath = format({
                dir: dest,
                name,
                ext: '.js'
            });
            writeFileSync(outputPath, code);
        }
        catch (e) {
            throw e;
        }
    });
}

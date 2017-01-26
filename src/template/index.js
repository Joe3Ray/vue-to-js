/**
 * @file make vue template string to render function string
 * @author JoeRay61(joeray199261@gmail.com)
 */

import {compile} from 'vue-template-compiler';
import transpile from 'vue-template-es2015-compiler';
import {js_beautify} from 'js-beautify';

/**
 * wrap code with function
 *
 * @param {string} code function content
 * @return {string} function string
 */
function toFunction(code) {
    return `
        function () {
            ${js_beautify(code)}
        }
    `;
}

/**
 * compile vue template to be render & staticRenderFns functions
 *
 * @param {string} template vue template string
 * @param {boolean=} useStrict whether to use strict mode
 * @return {string} a string that is an object which has render and
 *                  staticRenderFns property attached to module.exports
 */
export default function (template, useStrict = true) {
    const renderObj = compile(template);
    const render = renderObj.render;
    const staticRenderFns = renderObj.staticRenderFns;

    let result = `
        \nmodule.exports = {
            render: function () {
                ${render}
            },
            staticRenderFns: [
                ${staticRenderFns.map(toFunction).join(',')}
            ]
        };\n
    `;

    useStrict && (result = transpile(result));

    return result;
}

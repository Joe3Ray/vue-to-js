/**
 * @file extract export object from script block of .vue
 * @author JoeRay61(joeray199261@gmail.com)
 */

import {transform} from 'babel-core';

/**
 * compile vue script code to commonjs code
 *
 * @param {string} code vue script code
 * @return {string} commonjs code
 */
export default function (code) {
    let result = transform(code, {
        plugins: ['transform-es2015-modules-commonjs'],
        presets: ['env']
    });

    return result.code;
}

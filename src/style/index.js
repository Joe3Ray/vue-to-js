/**
 * @file append style code from .vue to document
 * @author JoeRay61(joeray199261@gmail.com)
 */

/**
 * generate a string represents the immediate execution function
 * that append the style tag with apointed css code
 *
 * @param {string} css style code
 * @return {string} the immediate execution function string
 */
export default function (css) {
    return `
        \n(function () {
            var style = document.createElement('style');
            style.innerText = '${css.replace(/\n/g, '')}';
            document.querySelector('head').appendChild(style);
        })();\n
    `;
}

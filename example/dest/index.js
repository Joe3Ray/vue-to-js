(function(module, exports) {
    /* append style */


    (function() {
        var style = document.createElement('style');
        style.innerText = '.pen {    text-align: left;}';
        document.querySelector('head').appendChild(style);
    })();



    /* get render function */
    var _module1 = {
        exports: {}
    };
    (function(module, exports) {


        module.exports = {
            render: function() {
                var _vm = this;
                var _h = _vm.$createElement;
                var _c = _vm._self._c || _h;
                return _c('div', {
                    staticClass: "pen"
                }, [_c('h2', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _vm._m(0)])
            },
            staticRenderFns: [

                function() {
                    var _vm = this;
                    var _h = _vm.$createElement;
                    var _c = _vm._self._c || _h;
                    return _c('div', [_c('p', [_vm._v("123")])])

                }

            ]
        };


    })(_module1, _module1.exports);

    /* get script output data */
    var _module2 = {
        exports: {}
    };
    (function(module, exports) {
        'use strict';

        var _a = require('a');

        var _a2 = _interopRequireDefault(_a);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        module.exports = {
            data: function data() {
                return {
                    title: ''
                };
            },
            created: function created() {
                var b = 123;
                console.log(b);
            },
            components: {
                tab: require('tab')
            }
        };
    })(_module2, _module2.exports);

    var obj = _module2.exports.default || _module2.exports;
    obj.render = _module1.exports.render;
    obj.staticRenderFns = _module1.exports.staticRenderFns;

    module.exports = obj;
})(this, this.exports = this.exports || {});
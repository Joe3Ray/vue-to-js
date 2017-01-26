'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (code) {
  var result = (0, _babelCore.transform)(code, {
    plugins: ['transform-es2015-modules-commonjs'],
    presets: ['env']
  });

  return result.code;
};

var _babelCore = require('babel-core');
# vue-to-js
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

A simple cli for transforming .vue to .js

## Installation

Prerequisites: Node.js (>=6.x, 6.x preferred).

```
$ npm install -g vue-to-js
```

## Usage

```
  Usage: vuetojs [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -r, --resource [path]  .vue file
    -d, --dest [path]      output directory
    -m, --mode [type]      output mode, one of amd/umd/global/commonjs
```

Example:

```
$ vuetojs -r src/*.vue -d output -m amd
```

## Lib

`vue-to-js` can also be used as a nodejs lib. Look at the example below for more information.

```
var vuetojs = require('vue-to-js');
var path = require('path');

var code = vuetojs.generateCode(path.resolve(__dirname, 'src/index.vue'), 'amd');
console.log(code);

vuetojs.compile({
    resource: 'src/*.vue',
    dest: 'dest',
    mode: 'amd'
});
```

### API

#### vuetojs.getBlocks

get all blocks code from `.vue` file

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path of .vue file |

#### vuetojs.generateCode

generate js code with appointed mode from single `.vue` file

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path of .vue file |
| mode | <code>string</code> | output mode, one of amd/umd/global/commonjs |

#### vuetojs.compile

compile `.vue` file to `.js` file

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | compile options |
| options.resource | <code>string</code> | path of .vue file, glob pattern |
| options.dest | <code>string</code> | directory of the compiled js files |
| options.mode | <code>string</code> | output mode, one of amd/umd/global/commonjs |

### Todo

- [x] beautify output js
- [ ] support source map
- [ ] support template engine
- [ ] support css preprocessor

## License

[MIT](https://opensource.org/licenses/MIT)

[npm-url]: https://npmjs.org/package/vue-to-js
[downloads-image]: http://img.shields.io/npm/dm/vue-to-js.svg
[npm-image]: http://img.shields.io/npm/v/vue-to-js.svg
[travis-url]: https://travis-ci.org/Joe3Ray/vue-to-js
[travis-image]: http://img.shields.io/travis/Joe3Ray/vue-to-js.svg
[coveralls-url]:https://coveralls.io/r/Joe3Ray/vue-to-js
[coveralls-image]:https://coveralls.io/repos/Joe3Ray/vue-to-js/badge.png
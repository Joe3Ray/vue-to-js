# vue-to-js
A simple cli for transforming .vue to .js

## Installation

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

## License

[MIT](https://opensource.org/licenses/MIT)
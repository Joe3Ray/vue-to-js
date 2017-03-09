var vuetojs = require('../lib');
var path = require('path');

var file = path.resolve(__dirname, './index.vue');
var code = vuetojs.generateCode(file);
var obj = vuetojs.getBlocks(file);

console.log(code);
console.log(obj);

vuetojs.compile({
    resource: file,
    dest: path.resolve(__dirname, 'dest'),
    mode: 'global'
});
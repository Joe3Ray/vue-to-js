/**
 * @file vuetojs test cases
 * @author JoeRay61(joeray199261@gmail.com)
 */

var expect = require('chai').expect;
var fs = require('fs');

describe('template', function () {
    var template = require('../lib/template').default;
    var str = '<div><p>{{abc}}</p><div><p>123</p></div></div>';

    var result1 = template(str);
    var result2 = template(str, false);

    it('should return string', function () {
        expect(result1).to.be.a('string');
        expect(result2).to.be.a('string');
    });

    it('should use strict by default', function () {
        expect(result1.indexOf('with')).to.be.below(0);
    });

    it('should not use strict when set useStrict to false', function () {
        expect(result2.indexOf('with')).to.be.above(0);
    });
});

describe('style', function () {
    var style = require('../lib/style').default;
    var result = style('body {color: red;}');

    it('should return string', function () {
        expect(result).to.be.a('string');
    });
});

describe('script', function () {
    var script = require('../lib/script').default;
    var result = script('exports.default = 123;');

    it('should return string', function () {
        expect(result).to.be.a('string');
    });
});

describe('vue-to-js api', function () {
    var vuetojs = require('../lib');
    var path = require('path');
    var filePath = path.resolve(__dirname, '../example/index.vue');

    var info1 = vuetojs.getBlocks(filePath);
    var info2 = vuetojs.getBlocks();
    var amdCode1 = vuetojs.generateCode(filePath);
    var amdCode2 = vuetojs.generateCode(filePath, 'xxx');
    var commonjsCode = vuetojs.generateCode(filePath, 'commonjs');
    var globalCode = vuetojs.generateCode(filePath, 'global');
    var umdCode = vuetojs.generateCode(filePath, 'commonjs');

    describe('getBlocks', function () {
        it('should return object when given filepath', function () {
            expect(info1).to.be.an('object');
        });

        it('should return undefined when not given filepath', function () {
            expect(info2).to.be.undefined;
        });
    });

    describe('generateCode', function () {
        it('should return string', function () {
            expect(amdCode1).to.be.a('string');
            expect(amdCode2).to.be.a('string');
            expect(commonjsCode).to.be.a('string');
            expect(globalCode).to.be.a('string');
            expect(umdCode).to.be.a('string');
        });
    });

    describe('compile', function () {
        it('should make dest/index.js', function () {
            vuetojs.compile({
                resource: path.resolve(__dirname, '../example/index.vue')
            });
            expect(fs.existsSync(path.resolve(__dirname, '../dest/index.js'))).to.be.true;
            fs.unlinkSync(path.resolve(__dirname, '../dest/index.js'));
            fs.rmdirSync(path.resolve(__dirname, '../dest'));
        });

        it('should throw error', function () {
            var fn = function () {
                vuetojs.compile({
                    resource: path.resolve(__dirname, '../example/index.vue'),
                    dest: path.resolve(__dirname, '../example/index.js')
                });
            };
            expect(fn).to.throw(Error);
        });

        it('should compile to the output directory', function () {
            vuetojs.compile({
                resource: path.resolve(__dirname, '../example/index.vue'),
                dest: path.resolve(__dirname, '../example/output')
            });
            expect(fs.existsSync(path.resolve(__dirname, '../example/output/index.js'))).to.be.true;
            fs.unlinkSync(path.resolve(__dirname, '../example/output/index.js'));
            fs.rmdirSync(path.resolve(__dirname, '../example/output'));
        });

        it('should use amd mode as default', function () {
            vuetojs.compile({
                resource: path.resolve(__dirname, '../example/index.vue'),
                dest: path.resolve(__dirname, '../example/dest')
            });
            var content = fs.readFileSync(path.resolve(__dirname, '../example/dest/index.js'), 'utf8');
            expect(content.indexOf('define(')).to.be.above(-1);
        });

        it('support amd/commonjs/umd/global mode', function () {
            vuetojs.compile({
                resource: path.resolve(__dirname, '../example/index.vue'),
                dest: path.resolve(__dirname, '../example/dest'),
                mode: 'global'
            });

            var content = fs.readFileSync(path.resolve(__dirname, '../example/dest/index.js'), 'utf8');
            var reg = /\(function\s?\(module,\s?exports\)\s?{/;
            expect(reg.test(content)).to.be.true;
        });
    });
});
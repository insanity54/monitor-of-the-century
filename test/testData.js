var mocha = require('mocha');
var expect = require('chai').expect;
var path = require('path');
var data = require(path.join(__dirname, '..', 'lib', 'data', 'data'));

describe('Data', function() {

    describe('set()', function() {
        it('should callback true after setting a value', function(done) {
            data.set('taco', 'yes please', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
    });
    
    
    describe('get()', function() {
        it('should return a value', function(done) {
            data.get('taco', function(err, value) {
                expect(err).to.be.null;
                expect(value).to.have.string('yes please');
                done();
            });
        });
    });

});
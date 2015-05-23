var expect = require('chai').expect;
var path = require('path');
var file = require(path.join('..', 'lib', 'file'));

var badJson  = '{"tee": false,"cool": true,"ta": "danke shin}';
var goodJson = '{"tee": false,"cool": true,"ta": "danke shin"}';

describe('File', function() {
    
    describe('parseJson()', function() {
        it('should call back with an error if bad json', function(done) {
            file.parseJson(badJson, function(err, json) {
                expect(err).to.not.be.null;
                expect(json).to.be.null;
                done();
            });
        });
        
        it('should call back with an object if good json', function(done) {
            file.parseJson(goodJson, function(err, json) {
                expect(err).to.be.null;
                expect(json).to.be.an('object');
                expect(json).to.have.property('cool');
                done();
            });
        });
    });
    
    
});
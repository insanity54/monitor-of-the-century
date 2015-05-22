var expect = require('chai').expect;
var path = require('path');
var files = require(path.join('..', 'lib', 'files'));

describe('Files', function() {
    
    describe('getTaskFiles()', function() {
        it('should call back with an array of task files', function(done) {
            files.getTaskFiles(function(err, tasks) {
                expect(err).to.be.null;
                expect(tasks).to.be.an('array');
                done();
            });
        });
    });
    
    describe('getUserFiles()', function() {
        it('should call back with an array of user files', function(done) {
            files.getUserFiles(function(err, users) {
                expect(err).to.be.null;
                expect(users).to.be.an('array');
                done();
            });
        });
    });
    
    
});
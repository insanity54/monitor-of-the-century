var expect = require('chai').expect;
var path = require('path');
var check = require(path.join('..', 'lib', 'check'));

describe('Check', function() {
    
    describe('execute()', function() {
        it('should execute the check script', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, result) {
               expect(err).to.be.null;
               done();
            });
        });
        
        it('should call back with a result object containing taskname, return status code, and message', function(done) {
           check.execute(['check_file_exists.sh', '/dev/random'], function(err, result) {
               expect(err).to.be.null;
               expect(result).to.be.an('object');
               expect(result).to.have.property('code');
               expect(result).to.have.property('message');
               done();
           });
        });
        
        it('should get a status code back from the check script', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, result) {
                expect(err).to.be.null;
                expect(result).to.be.an('object');
                expect(result.code).to.be.a('number');
                done();
            });
        });
        
        it('should optionally get a message back from the check script', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, result, message) {
                expect(err).to.be.null;
                expect(result.message).to.be.a('string');
                done();
            });
        });
    });
    
    
    
});
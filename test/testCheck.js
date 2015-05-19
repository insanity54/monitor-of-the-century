var expect = require('chai').expect;
var path = require('path');
var check = require(path.join('..', 'lib', 'check'));

describe('Check', function() {
    
    describe('execute()', function() {
        it('should execute the check script', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, status) {
               expect(err).to.be.null;
               done();
            });
        });
        
        it('should get a status code back from the check script', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, status) {
                expect(err).to.be.null;
                expect(status).to.be.a('number');
                done();
            });
        });
        
        it('should optionally get a message back from the check script', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, status, message) {
                expect(err).to.be.null;
                //console.log('message got back from script: ', message);
                expect(message).to.be.a('string');
                done();
            });
        });
    });
    
    
    
});
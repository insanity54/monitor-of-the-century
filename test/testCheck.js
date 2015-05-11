var expect = require('chai').expect;
var path = require('path');
var check = require(path.join('..', 'lib', 'check'));

describe('Check', function() {
    
    describe('execute()', function() {
        it('should execute the check script and get its return status code', function(done) {
            check.execute(['check_file_exists.sh', '/dev/random'], function(err, status) {
               expect(err).to.be.null;
               expect(status).to.be.a('number');
               done();
            });
        });
        
        
    });
});
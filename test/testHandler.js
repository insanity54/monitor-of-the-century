var expect = require('chai').expect;
var path = require('path');
var handler = require(path.join('..', 'lib', 'handler'));

describe('Handler', function() {
    
    describe('handle()', function() {
        it('should accept an error as first parameter')
        
        it('should accept a return code (0|1|2) as second parameter', function(done) {
            handler.handle(null, 0, 'ok - ALL GOOD IN THE HOODL', function(err, cb) {
                expect(err).to.be.null;
                done();
            });
        });
        
        it('should accept a string (stdout) as third parameter', function(done) {
            handler.handle(null, 0, 'OK - All good in the hood', function(err, cb) {
                expect(err).to.be.null;
                done();
            });
        });
        
        it('should e-mail admin if configured notif level reached', function(done) {
            var lastEmail = 
            handler.handle(null, 1, 'WARNING - MAYBE GOOD MAYBE BAD', function(err, cb) {
                expect(err).to.be.null;
                
                done();
            });
        });
        
    });
});
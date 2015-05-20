var expect = require('chai').expect;
var path = require('path');
var mail = require(path.join('..', 'lib', 'mail'));
var handler = require(path.join('..', 'lib', 'handler'));
var data = require(path.join('..', 'lib', 'data'));

describe('Handler', function() {
    
    describe('handle()', function() {
        it('should accept an error as first parameter', function() {
            var r = handler.handle(new Error('FART'), 2, 'crits - maximum meltage!');
            expect(r).to.equal(0);
        });
        
        it('should accept a return code (0|1|2) as second parameter', function() {
            var r = handler.handle(null, 0);
            expect(r).to.equal(0);
        });
        
        it('should optionally accept a string (stdout) as third parameter', function() {
            var r = handler.handle(null, 0, 'OK - All good in the hood');
            expect(r).to.equal(0);
        });
        
        it('should e-mail admin if configured notif level reached', function(done) {
            data.get('mail:lastHash', function(err, lastHash) {
                console.log('last hash is', lastHash);
                var r = handler.handle(null, 1, 'WARNING - MAYBE GOOD MAYBE BAD MAYBE NEUTRAL') ;
                
                expect(r).to.equal(0);
                    
                data.get('mail:lastHash', function(err, hash) {
                    console.log('this hash is ', hash);
                    expect(lastHash).to.not.equal(hash);
                    done();
                });
            });
        });
        
        
    });
});
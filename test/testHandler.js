var expect = require('chai').expect;
var path = require('path');
var mail = require(path.join('..', 'lib', 'mail'));
var handler = require(path.join('..', 'lib', 'handler'));
var data = require(path.join('..', 'lib', 'data'));

describe('Handler', function() {
    
    describe('handle()', function() {
        it('should accept an error as first parameter', function(done) {
            handler.handle(new Error('FART'), 2, 'crits - maximum meltage!');
        });
        
        it('should accept a return code (0|1|2) as second parameter', function(done) {
            handler.handle(null, 0, function(err, cb) {
                expect(err).to.be.null;
                done();
            });
        });
        
        it('should optionally accept a string (stdout) as third parameter', function(done) {
            handler.handle(null, 0, 'OK - All good in the hood', function(err, cb) {
                expect(err).to.be.null;
                done();
            });
        });
        
        it('should e-mail admin if configured notif level reached', function(done) {
            data.get('mail:lastHash', function(err, lastHash) {
                console.log('last hash is', lastHash);
                handler.handle(null, 1, 'WARNING - MAYBE GOOD MAYBE BAD', function(err, cb) {
                    expect(err).to.be.null;
                    
                    data.get('mail:lastHash', function(err, hash) {
                        expect(lastHash).to.not.equal(hash);
                        done();
                    });
                });
            });
        });
        
        
    });
});
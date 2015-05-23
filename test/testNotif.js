var expect = require('chai').expect;
var path = require('path');
var notif = require(path.join('..', 'lib', 'notif'));

describe('Notif', function() {
    
    describe('notify()', function() {

        it('should throw if second param is not a callback', function(done) {
            var e = new Error('second param must be a callback function');
            var fn = notif.notify;
            expect(fn.bind(fn, 'test message')).to.throw(e);
            done();
        });
        
        it('should use the configured method to send a notification to the specified user', function(done) {
            data.get('mail:lastHash', function(err, lastHash) {
                console.log('last hash is', lastHash);
                
                notif.notify('admin', 'test message!', function(err, ok) {
                    expect(err).to.be.null;
                    expect(ok).to.be.true;
                    done();
                    
                    data.get('mail:lastHash', function(err, hash) {
                        console.log('this hash is ', hash);
                        expect(lastHash).to.not.equal(hash);
                        done();
                    });
                });
            });
        });
        
        
        
    });
});
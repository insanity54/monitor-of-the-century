var expect = require('chai').expect;
var path = require('path');
var notif = require(path.join('..', 'lib', 'notif'));

describe('Notif', function() {
    
    describe('notify()', function() {
        it('should throw if it only gets one parameter', function(done) {
            expect(notif.notify('admin')).to.throw;
            done();
        });
        
        it('should throw if it doesnt get a callback parameter', function(done) {
            expect(notif.notify('admin', 'message')).to.throw;
            done();
        });
        
        it('should use the configured method to send a notification to the specified user', function(done) {
            notif.notify('admin', 'test message!', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
        
        
        
    });
});
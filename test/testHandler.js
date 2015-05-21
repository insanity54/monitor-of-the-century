var expect = require('chai').expect;
var path = require('path');
var mail = require(path.join('..', 'lib', 'mail'));
var handler = require(path.join('..', 'lib', 'handler'));
var data = require(path.join('..', 'lib', 'data'));


var goodResult = {
    message: "oh lawdy above, all is well",
    code: 0,
    task: 'example'
};

var badResult = {
    message: "SHOTS FIRED SHOTS FIRED",
    code: 2,
    task: 'example'
};

describe('Handler', function() {

    describe('handle()', function() {

        it('should callback if callback function is third param', function(done) {
            handler.handle(null, goodResult, function(err, ok) {
                if (err) throw err;
                expect(ok).to.be.true;
                done();
            });
        });
        
        it('should return 0 if callback function not received', function() {
            var r = handler.handle(null, goodResult);
            expect(r).to.equal(0);
        });

        it('should e-mail admin if configured notif level reached', function(done) {
            data.get('mail:lastHash', function(err, lastHash) {
                console.log('last hash is', lastHash);
                handler.handle(null, badResult, function(err, ok) {
                    if (err) throw err;
                    expect(ok).to.be.true;
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
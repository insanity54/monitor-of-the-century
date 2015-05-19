var expect = require('chai').expect;
var nconf = require('nconf');
var path = require('path');
var mail = require(path.join(__dirname, '..', 'lib', 'mail'));
var data = require(path.join(__dirname, '..', 'lib', 'data'));

nconf.file(path.join(__dirname, '..', 'config.json'));


describe('Mail', function() {
    it('should have a valid API key in config.json', function() {
        var mailgunKey = nconf.get('MAILGUN_KEY');
        expect(mailgunKey).to.be.a('string');
        expect(mailgunKey).to.match(/key-[0-9a-fA-F]{32}$/);
    });
    
    describe('send()', function() {
        it('should be able to send e-mail', function(done) {
            mail.send('test email', 'this is a test', 'recipient@example.com', 'sender@example.com', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
        
        it('should store the hash of the sent message', function (done) {
            mail.send('test email', 'this is a test', 'recipient@example.com', 'sender@example.com', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;

                data.get('mail:lastHash', function(err, hash) {
                    expect(err).to.be.null;
                    expect(hash).to.be.a('string');
                    expect(hash).to.match(/[a-f0-9]{32}/);
                    done();
                });
            });
        });
    });
    
    describe('s()', function() {
        it('should be able to send e-mail', function(done) {
            mail.s('test email', 'this is a test', 'recipient@example.com', 'sender@example.com', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
    });
});

var expect = require('chai').expect;
var nconf = require('nconf');
var path = require('path');
var mail = require(path.join(__dirname, '..', 'lib', 'mail'));

nconf.file(path.join(__dirname, '..', 'config.json'));


describe('Mail', function() {
    it('should have a valid API key in config.json', function() {
        var mailgunKey = nconf.get('MAILGUN_KEY');
        expect(mailgunKey).to.be.a('string');
        expect(mailgunKey).to.match(/key-[0-9a-fA-F]{32}$/);
    });
    
    it('should be able to send e-mail', function(done) {
        mail.send('test email', 'this is a test', 'recipient@example.com', 'sender@example.com', function(err, ok) {
            expect(err).to.be.null;
            expect(ok).to.be.true;
            done();
        });
    });
});

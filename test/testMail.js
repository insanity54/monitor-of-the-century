var mocha = require('mocha');
var should = require('chai').should();
var assert = require('chai').assert;
var Mailgun = require('mailgun').Mailgun;
var nconf = require('nconf');
var path = require('path');


nconf.file(path.join(__dirname, '..', 'config.json'));


describe('Mailgun', function() {
    it('should have a valid API key in config.json', function() {
        var mailgunKey = nconf.get('MAILGUN_KEY');
        mailgunKey.should.be.a('string');

        var valid = /key-[0-9a-fA-F]{32}$/;
        assert(valid.test(mailgunKey), 'api key not valid. must be in the format, \'key-\' followed by 32 hex characters.');
        //assert(false, 'test');
    }),
    
    it('should be able to send e-mail', function(done) {
        var mailgunKey = nconf.get('MAILGUN_KEY');
        var mg = new Mailgun(mailgunKey);
        mg.sendText('sender@example.com', 'recipient@example.com', 'test email', 'this is a test', function(err) {
            assert.isUndefined(err, 'e-mail failed to send. returned HTTP status code ' + err);
            done();
        });
    })
})

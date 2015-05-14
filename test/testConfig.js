var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

describe('Config', function() {
    
    it('should be valid JSON', function(done) {
        fs.readFile(path.join(__dirname, '..', 'config.json'), function(err, file) {
            expect(err).to.be.null;
            JSON.parse(file);
            done();
        });
    });
        
    it('should have all required properties', function(done) {
        fs.readFile(path.join(__dirname, '..', 'config.json'), function(err, file) {
            expect(err).to.be.null;
            try {
                var config = JSON.parse(file);
            }
            catch (e) {
                throw(new Error('config json is not valid', e), null);
            }
            
            if (!config.hasOwnProperty('MAILGUN_KEY')) throw(new Error('config json does not contain MAILGUN_KEY directive'));
            if (!config.hasOwnProperty('NOTIF_SENDER')) throw(new Error('config json does not contain NOTIF_SENDER directive'));
            if (!config.hasOwnProperty('NOTIF_SUBJECT_PREFIX')) throw(new Error('config json does not contain NOTIF_SUBJECT_PREFIX directive'));
            if (!config.hasOwnProperty('NOTIF_LEVEL')) throw(new Error('config json does not contain NOTIF_LEVEL'));
            done();
        });
    });
    
});

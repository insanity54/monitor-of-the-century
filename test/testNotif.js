var expect = require('chai').expect;
var path = require('path');
var notif = require(path.join('..', 'lib', 'notif'));
var data = require(path.join('..', 'lib', 'data'));
var users = require(path.join('..', 'lib', 'users'));

var notifOptions = {
    name: 'admin',
    subject: 'oh noes',
    message: 'this message of sorts is meant to message to you'
};

var mailTimeout = 30000;


describe('Notif', function() {
    
    describe('getParameters()', function() {
        
        it('should callback with object containing method', function(done) {
            notif.getParameters(notifOptions, function(err, content) {
               expect(err).to.be.null;
               expect(content).to.have.property('method');
               done();
            });
        });
    
        it('should throw if second param is missing', function(done) {
            //var e = new Error('second param must be a callback function');
            var fn = notif.getParameters;
            expect(fn.bind(fn, {message: 'test'})).to.throw(/must be a callback function/);
            done();
        });
        
        it('should throw if second param is not a callback', function(done) {
            var fn = notif.getParameters;
            expect(fn.bind(fn, {message: 'test'}, 'erroneous string that should be a cb'))
            .to.throw(/must be a callback function/);
            done();
        });
        
        it('should return error if specified user does not exist', function(done) {
            this.timeout(mailTimeout);
            users.load(function(err, usrs) {
                //console.log('>> loaded users: ', usrs);
                var options = {};
                options['name'] = 'Valentinez_Alkalinella_Xifax_Sicidabohertz_Gombigobilla_Blue_Stradivari_Talentrent_Pierre_Andri_Charton-Haymoss_Ivanovici_Baldeus_George_Doitzel_Kaiser_III';
                options['subject'] = 'subject';
                options['message'] = 'test message';
                
                notif.notify(options, function(err, ok) {
                    console.log('err- ', err);
                    expect(err).to.match(/user does not exist/);
                    expect(ok).to.be.null;
                    done();
                });
            });
        });
        
    });
        
    describe('notify()', function() {
        
        it('should callback the default method email if user method not set', function(done) {
            this.timeout(mailTimeout);
            users.load(function(err, usrs) {
                //console.log('>> usrs', usrs);

                notif.notify({name: 'felix', message: 'howdy felix'}, function(err, ok) {
                    expect(err).to.be.null;
                    expect(ok).to.be.true;
                    done();
                });
            });
        });
        
        it('should use the configured method to send a notification to the specified user', function(done) {
            this.timeout(mailTimeout);
            
            data.get('users', function(err, u) {
                //console.log('>> GOT USERS', u);
                data.get('mail:lastHash', function(err, lastHash) {
                    //console.log('>>last hash is', lastHash);
                    
                    notif.notify({name: 'admin', message: 'test message!'}, function(err, ok) {
                        //console.log('>>getin her');
                        expect(err).to.be.null;
                        expect(ok).to.be.true;
                        
                        data.get('mail:lastHash', function(err, hash) {
                            //console.log('>>hash check ', lastHash, hash);
                            expect(lastHash).to.not.equal(hash);
                            done();
                        });
                    });
                });
            });
        });
        
        
        
    });
});
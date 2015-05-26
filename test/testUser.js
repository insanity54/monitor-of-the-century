var expect = require('chai').expect;
var path = require('path');
var user = require(path.join('..', 'lib', 'user'));

describe('User', function() {
    

    describe('loadAndValidate()', function() {
        
        it('should call back with an object containing the user', function(done) {
            user.loadAndValidate(path.join(__dirname, 'blobs', 'userMinimumGood.json'), function(err, user) {
                expect(err).to.be.null;
                expect(user).to.be.an('object');
                expect(user).to.have.property('email');
                return done();
            });
        });
        
        it('should callback with error if file doesnt exist', function(done) {
            user.loadAndValidate(path.join(__dirname, 'blobs', 'userDoesNotExist.json'), function(err, user) {
                expect(err).to.not.be.null;
                expect(user).to.be.null;
                return done();
            });
        });
        
        it('should callback with no error, false if an invalid user', function(done) {
            user.loadAndValidate(path.join(__dirname, 'blobs', 'userNotGood.json'), function(err, user) {
                expect(err).to.be.null;
                expect(user).to.be.false;
                return done();
            });
        });
        
        it('should callback with user object if valid user', function(done) {
            user.loadAndValidate(path.join(__dirname, 'blobs', 'userGood.json'), function(err, user) {
                expect(err).to.be.null;
                expect(user).to.be.an('object');
                expect(user).to.have.property('email');
                return done();
            });
        });
    });

});
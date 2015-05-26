var expect = require('chai').expect;
var path = require('path');
var data = require(path.join(__dirname, '..', 'lib', 'data'));

describe('Data', function() {

    describe('set()', function() {
        it('should callback true after setting a value', function(done) {
            data.set('taco', 'yes please', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
    });
    
    
    describe('setSync()', function() {
        it('should return 0 after setting a value', function() {
            var reply = data.setSync('two_robots', 'human after all');
            expect(reply).to.equal(0);
        });
    });
    
    
    describe('get()', function() {
        it('should callback with no errors and a value', function(done) {
            data.get('taco', function(err, value) {
                expect(err).to.be.null;
                expect(value).to.have.string('yes please');
                done();
            });
        });
    });
    
    describe('getSync()', function() {
        it('should return the string content of the key', function() {
            var result = data.getSync('two_robots');
            expect(result).to.equal('human after all');
        });
    });
    
    describe('getTaskByName()', function() {
        it('should return a task given its name', function(done) {
            data.getTaskByName('coolworl.1', function(err, task) {
                expect(err).to.be.null;
                //console.log('task got from getTaskByName():', task);
                expect(task).to.be.an('object');
                expect(task).to.have.property('schedule');
                expect(task).to.have.property('check');
                done();
            });
        });
    });
    
    describe('getUserByName()', function() {
        it('should return a user given their name', function(done) {
            data.getUserByName('admin', function(err, user) {
                expect(err).to.be.null;
                expect(user).to.be.an('object');
                expect(user).to.have.property('method');
                done();
            });
        });
        
        it('should return error if no such user exists', function(done) {
            data.getUserByName('Valentinez_Alkalinella_Xifax_Sicidabohertz_Gombigobilla_Blue_Stradivari_Talentrent_Pierre_Andri_Charton-Haymoss_Ivanovici_Baldeus_George_Doitzel_Kaiser_III', function(err, user) {
                expect(err).to.match(/user does not exist/);
                expect(user).to.be.null;
                done();
            });
        });
    });
    

});
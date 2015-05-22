var expect = require('chai').expect;
var path = require('path');
var task = require(path.join('..', 'lib', 'task'));

describe('User', function() {
    

    describe('loadAndValidate()', function() {
        
        it('should call back with an object containing the user', function(done) {
            user.loadAndValidate(path.join(__dirname, 'blobs', 'userMinimumGood.json'), function(err, task) {
                expect(task).to.be.an('object');
                expect(task).to.have.property('check');
                expect(task).to.have.property('schedule');
                return done();
            });
        });
        
        it('should callback with error if file doesnt exist', function(done) {
            task.loadAndValidate(path.join(__dirname, 'blobs', 'doesNotExist.json'), function(err, task) {
                expect(err).to.not.be.null;
                expect(task).to.be.null;
                return done();
            });
        });
        
        it('should callback with false if an invalid task', function(done) {
            task.loadAndValidate(path.join(__dirname, 'blobs', 'notgood.json'), function(err, task) {
                expect(err).to.be.null;
                expect(task).to.be.false;
                return done();
            });
        });
        
        it('should callback with task object if valid task', function(done) {
            task.loadAndValidate(path.join(__dirname, 'blobs', 'good.json'), function(err, task) {
                expect(err).to.be.null;
                expect(task).to.be.an('object');
                expect(task).to.have.property('check');
                expect(task).to.have.property('schedule');
                return done();
            });
        });
    });
    
    describe('schedule()', function() {
        it('should schedule a check execution', function(done) {
            task.schedule(1, function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
    });
    
    describe('execute()', function() {
        it('should find the path of the task file and call check.execute', function(done) {
            task.execute('example', function(err, result) {
                expect(err).to.be.null;
                expect(result).to.be.an(object);
                done();
            });
        });
    });

});
var mocha = require('mocha');
var expect = require('chai').expect;
var path = require('path');
var task = require(path.join('..', 'lib', 'task'));

describe('Task', function() {
    

    describe('loadAndValidateTask()', function() {
        
        // we need the task definition
        // we need to know if there was an error
        
        it('should call back with an object containing the task', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'minimumGood.json'), function(err, task) {
                expect(task).to.be.an('object');
                expect(task).to.have.property('check');
                expect(task).to.have.property('schedule');
                return done();
            });
        });
        
        it('should callback with error if file doesnt exist', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'doesNotExist.json'), function(err, task) {
                expect(err).to.not.be.null;
                expect(task).to.be.null;
                return done();
            });
        });
    
        it('should callback with false if an invalid task', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'notgood.json'), function(err, task) {
                expect(err).to.be.null;
                expect(task).to.be.false;
                return done();
            });
        });
        
        it('should callback with task object if valid task', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'good.json'), function(err, task) {
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

});
var mocha = require('mocha');
var assert = require('chai').assert;
var expect = require('chai').expect;
var path = require('path');
var task = require(path.join('..', 'lib', 'task', 'task'));

describe('Task module', function() {
    

    
    describe('loadAndValidateTask()', function() {
        
        // we need the task definition
        // we need to know if there was an error
        
        it('should call back with an object containing the task', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'minimumGood.json'), function(err, loaded) {
                expect(task).to.be.an('object');
                expect(task).to.have.property('check');
                expect(task).to.have.property('schedule');
                return done();
            });
        });
        
        it('should callback with error if couldnt load', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'doesNotExist.json'), function(err, task) {
                expect(err).to.not.be.null;
                expect(task).to.be.null;
                return done();
            });
        });
    
        it('should reject an invalid task', function(done) {
             task.loadAndValidateTask(path.join(__dirname, 'blobs', 'notgood.json'), function(err, loaded) {
                 assert.isNull(err);
                 assert.isFalse(loaded, 'an invalid task was loaded');
                 return done();
             });
        });
        
        it('should accept a valid task', function(done) {
            task.loadAndValidateTask(path.join(__dirname, 'blobs', 'good.json'), function(err, loaded) {
                assert.isNull(err);
                assert.isTrue(loaded, 'a valid task was not loaded');
                return done();
            });
        });
    });



});
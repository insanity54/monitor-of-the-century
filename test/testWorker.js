// worker uses a check to do a task
var mocha = require('mocha');
var expect = require('chai').expect;
var path = require('path');
var worker = require(path.join('..', 'lib', 'util', 'tasks'));

describe('Worker module', function() {
    describe('loadTasks()', function() {
        it('should return an object containing all valid tasks', function(done) {
            worker.loadTasks(function(err, tasks) {
                expect(tasks).to.be.an('object');
                return done();
            });
        });
        
        it('should return both enabled and disabled tasks', function(done) {
            worker.loadTasks(function(err, tasks) {
                expect(tasks).to.have.property('enabled');
                expect(tasks).to.have.property('disabled');
                return done();
            });
        });
    });

    describe('scheduleTasks()', function() {
        it('should create a node-schedule job for each task');
    });
    
    //describe('')

});
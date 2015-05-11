var expect = require('chai').expect;
var path = require('path');
var tasks = require(path.join('..', 'lib', 'tasks'));
var data = require(path.join('..', 'lib', 'data'));

describe('Tasks', function() {
    
    describe('load()', function() {
        
        it('should callback with enabledTasks and disabledTasks objects', function(done) {
            tasks.load(function(err, tasks) {
                expect(err).to.be.null;
                expect(tasks).to.be.an('object');
                expect(tasks).to.have.property('enabledTasks');
                expect(tasks).to.have.property('disabledTasks');
                expect(tasks.enabledTasks).to.be.an('object');
                expect(tasks.disabledTasks).to.be.an('object');
                done();
            });
        });
        
        it('should have task names as object keys in enabledTasks', function(done) {
            tasks.load(function(err, tasks) {
                expect(err).to.be.null;
                //console.dir(tasks);
                var enabledTasks = tasks.enabledTasks;
                var firstTaskKey = Object.keys(enabledTasks)[0];
                //console.log('first task is', firstTaskKey);
                var firstTask = enabledTasks[firstTaskKey];
                expect(firstTask).to.be.an('object');
                expect(firstTask).to.have.property('check');
                expect(firstTask).to.have.property('schedule');
                done();
            });
        });
        
        it('should store valid enabled tasks in memory', function(done) {
            data.get('tasks', function(err, tasks) {
                expect(err).to.be.null;
                expect(tasks).to.have.property('enabledTasks');
                done();
            });
        });
        
        it('should store valid disabled tasks in memory', function(done) {
            data.get('tasks', function(err, tasks) {
                expect(err).to.be.null;
                expect(tasks).to.have.property('disabledTasks');
                done();
            });
        });
        
    });
    
    describe('schedule()', function() {
        it('should schedule the enabled tasks', function(done) {
            tasks.schedule(function(err, schedule) {
                expect(err).to.be.null;
                expect(schedule).to.be.an('array');
                done();
            });
        });
    });
    
    describe('watch()', function() {
        it('should watch the tasks directory for changes'); 
    });
});
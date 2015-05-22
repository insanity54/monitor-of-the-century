var expect = require('chai').expect;
var path = require('path');
var users = require(path.join('..', 'lib', 'users'));
var data = require(path.join('..', 'lib', 'data'));

describe('Users', function() {
    
    describe('load()', function() {
        
        it('should callback with enabledUsers and disabledUsers objects', function(done) {
            users.load(function(err, users) {
                expect(err).to.be.null;
                expect(users).to.be.an('object');
                expect(users).to.have.property('enabledUsers');
                expect(users).to.have.property('disabledUsers');
                expect(users.enabledUsers).to.be.an('object');
                expect(users.disabledUsers).to.be.an('object');
                done();
            });
        });
    });
        
    //     it('should have task names as object keys in enabledUsers', function(done) {
    //         users.load(function(err, users) {
    //             expect(err).to.be.null;
    //             //console.dir(tasks);
    //             var enabledTasks = tasks.enabledTasks;
    //             var firstTaskKey = Object.keys(enabledTasks)[0];
    //             //console.log('first task is', firstTaskKey);
    //             var firstTask = enabledTasks[firstTaskKey];
    //             expect(firstTask).to.be.an('object');
    //             expect(firstTask).to.have.property('check');
    //             expect(firstTask).to.have.property('schedule');
    //             done();
    //         });
    //     });
        
    //     it('should store valid enabled tasks in memory', function(done) {
    //         data.get('tasks', function(err, tasks) {
    //             expect(err).to.be.null;
    //             expect(tasks).to.have.property('enabledTasks');
    //             done();
    //         });
    //     });
        
    //     it('should store valid disabled tasks in memory', function(done) {
    //         data.get('tasks', function(err, tasks) {
    //             expect(err).to.be.null;
    //             expect(tasks).to.have.property('disabledTasks');
    //             done();
    //         });
    //     });
        
    // });
    
    // describe('schedule()', function() {
    //     it('should schedule the enabled tasks', function(done) {
    //         tasks.schedule(function(err, schedule) {
    //             expect(err).to.be.null;
    //             expect(schedule).to.be.an('array');
    //             done();
    //         });
    //     });
    // });
    
    describe('watch()', function() {
        it('should watch the users directory for changes'); 
    });
});
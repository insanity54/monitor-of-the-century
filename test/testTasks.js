var mocha = require('mocha');
var expect = require('chai').expect;
var path = require('path');
var tasks = require(path.join('..', 'lib', 'util', 'tasks'));
var data = require(path.join('..', 'lib', 'data', 'data'));

describe('Tasks', function() {
    
    describe('load()', function() {
        
        it('should callback with enabledTasks and disabledTasks', function(done) {
            tasks.load(function(err, tasks) {
                expect(err).to.be.null;
                expect(tasks).to.be.an('object');
                expect(tasks).to.have.property('enabledTasks');
                expect(tasks).to.have.property('disabledTasks');
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
        it('should schedule the enabled tasks');
    });
});
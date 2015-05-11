var expect = require('chai').expect;
var path = require('path');
var schedule = require(path.join(__dirname, '..', 'lib', 'schedule'));
var data = require(path.join(__dirname, '..', 'lib', 'data'));


describe('Schedule', function() {
    describe('add()', function() {
        it('should schedule the inputted task', function(done) {
            schedule.add('coolworl.1', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
        
        it('should save a reference to the schedule job', function(done) {
            data.getTaskByName('coolworl.1', function(err, task) {
                expect(err).to.be.null;
                expect(task).to.be.an('object');
                expect(task).to.have.property('__job');
                expect(task.__job).to.match(/\A((\d|\*)\s?){4}(\d|\*)\z/); // match a cron string, ex: '48 * * * *'
                done();
            });
        });
    });
});
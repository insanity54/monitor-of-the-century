var expect = require('chai').expect;
var path = require('path');
//var schedule = require(path.join(__dirname, '..', 'lib', 'schedule'));
var cron = require('node-schedule');
var data = require(path.join(__dirname, '..', 'lib', 'data'));
var job = require(path.join(__dirname, '..', 'lib', 'job'));

describe('Job', function() {
    describe('create()', function() {
        it('should take a schedule module job as a parameter', function(done) {
            
            j = cron.scheduleJob('* * * * *', function() {
                console.log("because we're testing, this line will never run");
            });
            
            job.create(j, function(err, ok) {
                if (err) throw err;
                expect(ok).to.be.true;
                done();
            });
        });
    });
});
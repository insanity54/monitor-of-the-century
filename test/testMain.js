var expect = require('chai').expect;
var path = require('path');
var main = require(path.join('..', 'lib', 'main'));
var app = require(path.join('..', 'index'));
var data = require(path.join('..', 'lib', 'data'));
var schedule = require(path.join('..', 'lib', 'schedule'));


describe('Main', function() {

    it('should load valid enabled tasks into datastore', function(done) {
        main(app);
        data.get('tasks', function(err, value) {
            expect(err).to.be.null;
            expect(value).to.have.property('enabledTasks');
            done();
        });
    });

    it('should load valid disabled tasks into datastore', function(done) {
        main(app);
        data.get('tasks', function(err, value) {
            expect(err).to.be.null;
            expect(value).to.have.property('disabledTasks');
            done();
        });
    });
    
    it('should load valid enabled users into datastore', function(done) {
        main(app);
        data.get('users', function(err, users) {
            expect(err).to.be.null;
            expect(users).to.have.property('enabledUsers');
            done();
        });
    });
        
    it('should load valid disabled users into datastore', function(done) {
        main(app);
        data.get('users', function(err, users) {
            expect(err).to.be.null;
            expect(users).to.have.property('disabledUsers');
            done();
        });
    });

    it('should schedule enabled tasks');
    // it('should schedule enabled tasks', function(done) {
    //     main(app);
    //     // check active jobs in the node-schedule module to see if main was successful
    //     schedule.getJobsByTime('48 * * * *', function(err, jobs) {
    //         expect(err).to.be.null;
    //         expect(jobs).to.be.an('array');
    //         expect(jobs).to.contain('coolworl.json');
    //         done();
    //     });
    // });
    
});
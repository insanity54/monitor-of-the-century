var expect = require('chai').expect;
var path = require('path');
var data = require(path.join(__dirname, '..', 'lib', 'data'));

describe('Data', function() {

    describe('set()', function() {
        it('should callback true after setting a value', function(done) {
            data.set('taco', 'yes please', function(err, ok) {
                expect(err).to.be.null;
                expect(ok).to.be.true;
                done();
            });
        });
    });
    
    
    describe('get()', function() {
        it('should return a value', function(done) {
            data.get('taco', function(err, value) {
                expect(err).to.be.null;
                expect(value).to.have.string('yes please');
                done();
            });
        });
    });
    
    describe('getTaskByName()', function() {
        it('should return a task given its name', function(done) {
            data.getTaskByName('coolworl.1', function(err, task) {
                expect(err).to.be.null;
                //console.log('task got from getTaskByName():', task);
                expect(task).to.be.an('object');
                expect(task).to.have.property('schedule');
                expect(task).to.have.property('check');
                done();
            });
        });
    });

});
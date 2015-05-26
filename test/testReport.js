var expect = require('chai').expect;
var path = require('path');
var report = require(path.join('..', 'lib', 'report'));

describe('Report', function() {
    
    describe('log()', function(done) {
        it('should accept an options object as first argument', function() {
            var options = {level: 'warn'};
            var r = report.log(options, 'terd');
            expect(r).to.equal(0);
        });
            
        it('should accept a string as first argument', function() {
            var r = report.log('terd');
            expect(r).to.equal(0);
        });
        
        it('should concatenate all non-options arguments into a string, separated by a space', function() {
            var options = {level: 'notice'};
            var worstThingEver = 'Teemo';
            var r = report.log(options, 'terd', worstThingEver, 'is my', 'friend');
            //var p = 
            expect(r).to.equal(0);
        });
        
        it('should append reports to log', function(done) {
            var msg = 'this is a message to log!';
            report.log(msg);
            expect(report.list()).to.contain(msg);
        });
    });
    
    
    describe('list()', function(done) {
        it('should return an array of log messages');
    });
    
    describe('print()', function(done) {
        it('should display the report in a pretty manner', function(done) {
            report.print();
        });
    });

});
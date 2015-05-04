var mocha = require('mocha');
var should = require('chai').should();
var assert = require('chai').assert;
var path = require('path');
var task = require(path.join('..', 'lib', 'task', 'task'));

describe('Task module', function() {
    

    
    describe('loadAndValidateTask()', function() {
    
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
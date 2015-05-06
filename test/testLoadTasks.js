var mocha = require('mocha');
var expect = require('chai').expect;
var path = require('path');
var tasks = require(path.join('..', 'lib', 'util', 'tasks'));
var app = require(path.join('..', 'index'));

describe('loadTasks', function() {
    
    // it('should load all valid tasks', function() {
    //     tasks.load(function());
    // });
    
    it('should store valid enabled tasks in memory');
    it('should store valid disabled tasks in memory');
    
});
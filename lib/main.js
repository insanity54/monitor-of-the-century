// misc helper functions for tasks
var fs = require('fs');
var path = require('path');
var async = require('async');

// load lasks, store valid enabled & valid disabled in memory
// schedule enabled tasks

var main = function main(app) {
    
    async.series([
        function loadScripts(cb){
            
            cb(null, 'one');
        },
        function(callback){
            // do some more stuff ... 
            callback(null, 'two');
        }
    ],
    // optional callback 
    function(err, results){
        // results is now equal to ['one', 'two'] 
    });


};

// function loadTasks() {
    
//     async.each(, iterator, callback)
// }

// function scheduleTasks() {
    
// }

// module.exports = {
//     loadTasks: loadTasks,
//     scheduleTasks: scheduleTasks
// }

module.exports = main;
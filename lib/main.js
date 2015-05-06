// misc helper functions for tasks
var fs = require('fs');
var path = require('path');
var async = require('async');
var tasks = require(path.join(__dirname, 'util', 'tasks'));

// load lasks, store valid enabled & valid disabled in memory
// schedule enabled tasks

var main = function main(app) {
    
    async.series([
        tasks.load,
        tasks.schedule,
        tasks.watch
    ],
    function(err, results) {
        if (err) throw new Error('could not initialize. ' + err);
        console.log('initalized. results:', results);
    });
    
};
    
    
    //     function loadScripts(cb){
            
    //         cb(null, 'one');
    //     },
    //     function(callback){
    //         // do some more stuff ... 
    //         callback(null, 'two');
    //     }
    // ],
    // // optional callback 
    // function(err, results){
    //     // results is now equal to ['one', 'two'] 
    // });



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
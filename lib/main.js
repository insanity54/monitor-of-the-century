// start up the program.
// loads configuration, users and tasks. schedules task executions. watches
// task directory & task files for changes




var path = require('path');
var async = require('async');
var tasks = require(path.join(__dirname, 'tasks'));
var users = require(path.join(__dirname, 'users'));
var data = require(path.join(__dirname, 'data'));




// load lasks, store valid enabled & valid disabled in memory
// schedule enabled tasks

var main = function main(app) {
    
    // load configuration
    data.setSync('mail:sender', app.get('mailSender'));
    
    // load user & task definitions
    async.series([
        users.load,
        tasks.load,
        tasks.schedule,
        //users.watch,
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
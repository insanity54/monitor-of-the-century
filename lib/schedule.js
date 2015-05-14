var moment = require('moment');
var path = require('path');
var cron = require('node-schedule');
var data = require(path.join(__dirname, 'data'));
var check = require(path.join(__dirname, 'check'));
var job = require(path.join(__dirname, 'job'));

// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('42 * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
// });

// And:

// var j = schedule.scheduleJob('0 17 ? * 0,4-6', function(){
//     console.log('Today is recognized by Rebecca Black!');
// });




/**
 * add
 * adds a task to execution schedule.
 * 
 * @param {string} task - the taskname
 * @param {addedCallback} - called once task added to schedule
 */
var add = function add(task, cb) {
    data.getTaskByName(task, function(err, t) {
        if (err) return cb(new Error('could not schedule task ' + task + ' ' + err), null);
        console.log('got task object', t);
        
        // make sure task arguments are in array form
        var args = (function getTaskArgs() {
            if (Object.prototype.toString.call(t.arguments) === '[object Array]') return t.arguments;
            var a = [];
            a.push(t.arguments);
            return a;
        })(t);
        
        // prepare exec array
        var exec = [];
        exec.push(t.check);
        exec = exec.concat(args);

        // create node-schedule job
        console.log('task is', task);
        var j = cron.scheduleJob(task, t.schedule, job.run(task));
        
        // save reference to event emitter
        // data.setJob(t, j, function(err, ok) {
        //     console.log('task is scheduled', j);
        //     return cb(null, true);
        // });
        // save event emitter
        // task['__job'] = job;
        // data.set();
        

    });
};
/**
 * @callback {addedCallback}
 * @param {error} err - error if there was an error adding task
 * @param {boolean} ok - true if task added successfully
 */




/**
 * getJobsByTime
 * finds scheduled jobs and returns them.
 * can be used to get a reference to a job that needs to be cancelled
 * 
 * @param {string} time - the cron-style schedule for the job to find
 * @param {gotJobsCallback} - callback once job(s) found
 */
var getJobsByTime = function getJobsByTime(time, cb) {
    
    
    // // check every hour, alert if centurylink is down.
    // schedule.scheduleJob('48 * * * *', function(){
    //     checkCenturylink(function(err) {
    //         console.log('auto check done ' + moment().format('LLLL'));
    //     });
    // });
    

    // var checksEnabled = app.get('checksEnabled');
    
    // var child = new (forever.Monitor)('ping.js', {
    //     max: 3,
    //     silent: false,
    //     args: []
    // });
    
    // child.on('exit', function () {
    //     console.log('ping.js has exited after 3 restarts');
    // });
    
    // child.start();
};
/**
 * gotJobsCallback
 * called back once matching job(s) found
 * 
 * @callback {gotJobsCallback}
 * @param {error} err - Error object only if node-schedule throws an error
 * @param {array} jobs - array of jobs matching the cron-style time
 */





module.exports = {
    getJobsByTime: getJobsByTime,
    add: add
};
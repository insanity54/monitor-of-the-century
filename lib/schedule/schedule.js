var moment = require('moment');
var forever = require('forever');
var cron = require('node-schedule');



// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('42 * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
// });

// And:

// var j = schedule.scheduleJob('0 17 ? * 0,4-6', function(){
//     console.log('Today is recognized by Rebecca Black!');
// });


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
    getJobsByTime: getJobsByTime    
};
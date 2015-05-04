var moment = require('moment');
var forever = require('forever');
var schedule = require('node-schedule');


var runner = function runner(app) {
    
    
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

module.exports = runner;
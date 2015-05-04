// misc helper functions for tasks
var fs = require('fs');
var path = require('path');


function validateTaskJson(taskJson, cb) {
    try {
        var task = JSON.parse(taskJson);
    }
    catch (e) {
        return cb(null, false);
    }
    if (!task.hasOwnProperty('check') ||
        !task.hasOwnProperty('schedule')) {
        return cb(null, false);
    }
    // make sure task has 'enabled: true' or no enabled directive
    if (task.hasOwnProperty('enabled')) {
        if (!task.enabled) return cb(null, false);
    }
    return cb(null, true);
}


function loadAndValidateTask(taskFile, cb) {
    //console.log('opeining task file', taskFile);
    fs.readFile(taskFile, function(err, data) {
        if (err) throw new Error(err);
        if (!data) throw new Error('no data in task file');
        validateTaskJson(data, function(err, valid) {
            if (err) throw new Error('could not validate json');
            if (!valid) return cb(null, false);
            return cb(null, true);
        });
    });
}

function schedule(taskFile, cb) {
    console.log('scheduling', taskFile);
    return cb(null, true);
}



module.exports = {
    
    loadAndValidateTask: loadAndValidateTask,
    validateTaskJson: validateTaskJson,
    schedule: schedule
};
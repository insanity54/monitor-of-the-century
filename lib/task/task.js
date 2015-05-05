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


/**
 *  Loads a single task given it's filename. Calls back with true if a valid task
 * 
 * @param {String} taskFile - filename of the task to load and validate
 * @param {loadCallback} cb - callback handling the loaded task
 */
function loadAndValidateTask(taskFile, cb) {
    //console.log('opeining task file', taskFile);
    fs.readFile(taskFile, function(err, data) {
        if (err) return cb(err, null);
        if (!data) return cb(new Error('no data in task file'), null);
        validateTaskJson(data, function(err, valid) {
            if (err) return cb(new Error('could not validate json'), null);
            if (!valid) return cb(null, false);
            return cb(null, true);
        });
    });
}

/**
 * Callback handling the loaded task
 * @callback loadCallback
 * @param {Error} err - error!!
 * @param {object} task - javascript object representing the loaded task 
 */

/**
 * idk if this will stay
 */
function schedule(taskFile, cb) {
    console.log('scheduling', taskFile);
    return cb(null, true);
}





module.exports = {
    
    loadAndValidateTask: loadAndValidateTask,
    validateTaskJson: validateTaskJson,
    schedule: schedule
};
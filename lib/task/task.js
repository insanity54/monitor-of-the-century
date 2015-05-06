// misc helper functions for tasks
var fs = require('fs');
var path = require('path');

/**
 * parses and validates the task data. calls back with js object if valid, otherwise false
 * 
 * @param {string} taskJson the string data of the task json
 * @param {parseCallback} cb
 */
function parseTaskJson(taskJson, cb) {
    try {
        var task = JSON.parse(taskJson);
    }
    catch (e) {
        return cb(new Error('task json is not valid', e), null);
    }
    if (!task.hasOwnProperty('name') ||
        !task.hasOwnProperty('check') ||
        !task.hasOwnProperty('schedule')) {
        return cb(new Error('task json does not contain name, check, and schedule directives'), null);
    }
    // make sure task has 'enabled: true' or no enabled directive // gunna handle this elsewhere
    // if (task.hasOwnProperty('enabled')) {
    //     if (!task.enabled) return cb(null, false);
    // }
    return cb(null, task);
}
/**
 * Callback handling of the validated task
 * @callback parseCallback
 * @param {Error} err
 * @param {object} validTask - object of task if it was valid
 */




/**
 * Loads a single task given it's filename. Calls back with true if a valid task
 * 
 * @param {String} taskFile - filename of the task to load and validate
 * @param {loadCallback} cb - callback handling the loaded task
 */
function loadAndValidateTask(taskFile, cb) {
    //console.log('opeining task file', taskFile);
    fs.readFile(taskFile, {encoding: 'utf8'}, function(err, data) {
        if (err) return cb(err, null);
        if (!data) return cb(new Error('no data in task file'), null);
        task = JSON.parse(data);
        parseTaskJson(data, function(err, valid) {
            if (err) return cb(new Error('could not validate json'), null);
            if (!valid) return cb(null, false);
            return cb(null, task);
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
    parseTaskJson: parseTaskJson,
    schedule: schedule
};
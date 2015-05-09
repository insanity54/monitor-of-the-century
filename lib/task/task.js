// misc helper functions for tasks
var fs = require('fs');
var path = require('path');
var data = require(path.join(__dirname, '..', 'data', 'data'));

/**
 * parses and validates the task data. calls back with js object if valid, otherwise false
 * 
 * @param {string} taskJson the string data of the task json
 * @param {parseCallback} cb
 */
var parseTaskJson = function parseTaskJson(taskJson, cb) {
    try {
        var task = JSON.parse(taskJson);
    }
    catch (e) {
        return cb(new Error('task json is not valid', e), null);
    }
    if (!task.hasOwnProperty('check') ||
        !task.hasOwnProperty('schedule')) {
            return cb(new Error('task json does not contain check and schedule directives'), null);
    }
    // make sure task has 'enabled: true' or no enabled directive // gunna handle this elsewhere
    // if (task.hasOwnProperty('enabled')) {
    //     if (!task.enabled) return cb(null, false);
    // }
    return cb(null, task);
};
/**
 * Callback handling of the validated task
 * @callback parseCallback
 * @param {Error} err
 * @param {object} validTask - object of task if it was valid. false if invalid task.
 */




/**
 * Loads a single task given it's filename. Calls back with true if a valid task
 * 
 * @param {String} taskFile - filename of the task to load and validate
 * @param {loadCallback} cb - callback handling the loaded task
 */
var loadAndValidateTask = function loadAndValidateTask(taskFile, cb) {
    //console.log('opeining task file', taskFile);
    fs.readFile(taskFile, {encoding: 'utf8'}, function(err, data) {
        if (err) return cb(err, null);
        if (!data) return cb(new Error('no data in task file'), null);
        parseTaskJson(data, function(err, task) {
            if (err) return cb(null, false);
            if (!task) return cb(null, false);
            return cb(null, task);
        });
    });
};
/**
 * Callback handling the loaded task
 * @callback loadCallback
 * @param {Error} err - error!!
 * @param {object} task - javascript object representing the loaded task 
 */




/**
 * schedule
 * using the schedule module, schedule a task to run based on it's json taskfile.
 * 
 * @param {string} taskId - ID assigned to the task when it was loaded to datastore
 * @param {scheduledCallback} cb
 */
var schedule = function schedule(taskId, cb) {
    //console.log('scheduling', taskId);
    
    return cb(null, true);
};
/**
 * scheduledCallback
 * called when task scheduling is finished
 * 
 * @callback {scheduledCallback}
 * @param {error} err
 * @param {boolean} ok - true if task was scheduled sucessfully
 */





module.exports = {
    loadAndValidateTask: loadAndValidateTask,
    parseTaskJson: parseTaskJson,
    schedule: schedule
};
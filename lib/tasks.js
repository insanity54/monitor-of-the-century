// load enabled tasks

var path = require('path');
var async = require('async');
var task = require(path.join(__dirname, 'task'));
var data = require(path.join(__dirname, 'data'));
var files = require(path.join(__dirname, 'files'));
var format = require(path.join(__dirname, 'format'));
var taskDir = path.join(__dirname, '..', 'tasks-enabled');




/**
 * load
 * Loads all task files in the tasks-enabled directory
 * saves the tasks to the datastore (in memory)
 * 
 * @param {loadCallback} cb - called back once all tasks loaded
 */
function load(callback) {
    files.getTaskFiles(function(err, files) {
        if (err) throw new Error('could not load the tasks-enabled directory');
        
        var tasks = {};
        tasks['disabledTasks'] = {};
        tasks['enabledTasks'] = {};

        //each(arr, iterator, callback)
        async.each(files, function(file, cb) {
            
            // Perform operation on file here.
            // give the file a full path
            var fileName = format.baseName(file);
            var filePath = path.join(taskDir, file);

            task.loadAndValidateTask(filePath, function(err, t) {
                if (err) return cb(err);
                if (!t) return cb(null); // file is not a valid task
                
                //console.log('file is ', format.baseName(file));
                
                
                // determine if task is enabled or disabled
                // push task into it's place
                if (!t.enabled) tasks.disabledTasks[fileName] = t; //@todo insert filename in [] //ccc
                if (t.enabled) tasks.enabledTasks[fileName] = t;
                
                cb(null);
            });
        },
        function(err) {
            if (err) throw err;
            //console.log('asyc.each is done', tasks);
            data.set('tasks', tasks, function(err, ok) {
                if (err) throw err;
                if (!ok) throw new Error('couldnt set tasks in datastore');
                return callback(null, tasks);
            });
        });
    });
}
/**
 * loadCallback
 * @callback {loadCallback}
 * @param {error} err
 * @param {array} tasks - list of valid tasks
 */




/**
 * schedule
 * schedule the task executions
 * 
 * @param {scheduleCallback} cb
 */
var schedule = function schedule(callback) {
    data.getTasks(function(err, tasks) {
        if (err) throw err;
        //arr, iterator, cb
        async.each(tasks, function(task, cb) {
            console.log(task);
            return cb(null);
        },
        function(err) {
            if (err) throw err;
            //console.log('asyc.each is done', tasks);
            data.set('tasks', tasks, function(err, ok) {
                if (err) throw err;
                if (!ok) throw new Error('couldnt set tasks in datastore');
                return callback(null, tasks);
            });
        });
    });
};
/**
 * scheduleCallback
 * @callback {scheduleCallback}
 * @param {error} err
 * @param {bool} ok - true if scheduled successfully
 */




/**
 * watch
 * watches the tasks-enabled directory for changes, and loads or unloads a task as necessary
 * 
 * @param {watchCallback} cb
 */
var watch = function watch(cb) {
    
};
/**
 * watchCallback
 * @callback {watchCallback}
 * @param {error} err
 * @param {bool} ok - true if watching was started sucessfully
 */




module.exports = {
    load: load,
    schedule: schedule,
    watch: watch
};
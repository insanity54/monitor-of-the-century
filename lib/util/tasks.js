// load enabled tasks

var path = require('path');
var async = require('async');
var task = require(path.join(__dirname, '..', 'task', 'task'));
var data = require(path.join(__dirname, '..', 'data', 'data'));
var files = require(path.join(__dirname, 'files'));


/**
 * load
 * Loads all task files in the tasks-enabled directory
 * saves the tasks to the datastore (in memory)
 * 
 * @param {loadCallback} cb - called back once all tasks loaded
 */
var load = function load(cb) {
    files.getTaskFiles(function(err, files) {
        if (err) throw new Error('could not load the tasks-enabled directory');
        
        var tasks = {};
        tasks['disabledTasks'] = [];
        tasks['enabledTasks'] = [];
        
        //each(arr, iterator, callback)
        async.each(files, function(file, cb) {
            
            // Perform operation on file here. 
            console.log('Processing file ' + file);
            
            task.loadAndValidateTask(file, function(err, task) {
                if (err) throw err;
                if (!task) throw new Error('there was no task');
                
                // determine if task is enabled or disabled
                // push task into it's place
                if (!task.enabled) tasks.disabledTasks.push(task);
                if (task.enabled) tasks.enabledTasks.push(task);
                
                cb(null);
            });
        });
        
        // ^ file needs to have an absolute path. fix it in the file module or whatever
        // @todo //ccc //todo continue this. make it pass the tests
        // 
        
        // // add the task to the enabled list (in memory)
        // data.set('tasksEnabled', data.get('tasksEnabled').concat(file), function(err, ok) {
        //     if (err) return cb(new Error('could not save task list to data'), null);
            
        //     // 
            
            
            
        //     data.get('tasksEnabled', function(err, list) {
        //         if (err) return cb(new Error('could not load task list from database'), null);
        //         console.log('here is the task list:', list);
        //         return cb(null, list);
        //     });
        // });
    });
};
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
var schedule = function schedule(cb) {
    
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
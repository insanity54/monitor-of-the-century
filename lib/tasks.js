// load enabled tasks

var path = require('path');
var async = require('async');
var task = require(path.join(__dirname, 'task'));
var data = require(path.join(__dirname, 'data'));
var files = require(path.join(__dirname, 'files'));
var taskDir = path.join(__dirname, '..', 'tasks-enabled');

/**
 * baseName
 * greets to https://stackoverflow.com/questions/3820381/need-a-basename-function-in-javascript
 */
function baseName(str) {
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}



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
            var fileName = baseName(file);
            var filePath = path.join(taskDir, file);

            task.loadAndValidateTask(filePath, function(err, task) {
                if (err) return cb(err);
                if (!task) return cb(null); // file is not a valid task
                
                //console.log('file is ', baseName(file));
                
                
                // determine if task is enabled or disabled
                // push task into it's place
                if (!task.enabled) tasks.disabledTasks[fileName] = task; //@todo insert filename in [] //ccc
                if (task.enabled) tasks.enabledTasks[fileName] = task;
                
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
function schedule(cb) {
    
}
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
function watch(cb) {
    
}
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
// misc helper functions for files

var fs = require('fs');
var path = require('path');
var taskDir = path.join(__dirname, '..', '..', 'tasks-enabled');


/**
 * getTaskFiles
 * fetches the task files in the tasks-enabled directory
 * 
 * @param {fileCallback} cb
 */
var getTaskFiles = function getTasks(cb) {
    fs.readdir(taskDir, function(err, files) {
        if (err) throw new Error('could not read tasks directory');
        return cb(null, files);
    });
};
/**
 * fileCallback
 * 
 * @callback {fileCallback} cb
 * @param {err} err
 * @param {Array} files - list of files in the tasks-enabled directory. file name only (no path)
 */



module.exports = {
    getTaskFiles: getTaskFiles
};
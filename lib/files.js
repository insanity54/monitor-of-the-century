// misc helper functions for files

var fs = require('fs');
var path = require('path');
var taskDir = path.join(__dirname, '..', 'tasks-enabled');
var userDir = path.join(__dirname, '..', 'users-enabled');




/**
 * getTaskFiles
 * fetches the task files in the tasks-enabled directory
 * 
 * @param {fileCallback} cb
 */
var getTaskFiles = function getTaskFiles(cb) {
    fs.readdir(taskDir, function(err, files) {
        if (err) throw new Error('could not read tasks directory');
        return cb(null, files);
    });
};
/**
 * fileCallback
 * 
 * @callback {fileCallback} cb
 * @param {error} err
 * @param {Array} files - list of files in the tasks-enabled directory. file name only (no path)
 */




/**
 * getUserFiles
 * fetches the user files in the users-enabled directory
 * 
 * @param {gotUsersCallback} cb
 */
var getUserFiles = function getUserFiles(cb) {
    fs.readdir(userDir, function(err, users) {
        if (err) throw new Error('could not read users directory');
        return cb(null, users);
    });
};
/**
 * gotUsersCallback
 * 
 * @callback {} cb
 * @param {error} err
 * @param {array} users - list of filenames of user definitions in the users-enabled dir.
 */




module.exports = {
    getTaskFiles: getTaskFiles,
    getUserFiles: getUserFiles
};
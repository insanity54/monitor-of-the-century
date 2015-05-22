// var fs = require('fs');
// var path = require('path');
// var data = require(path.join(__dirname, 'data'));
// var files = require(path.join(__dirname, 'files'));

// load user definitions

var path = require('path');
var async = require('async');
var task = require(path.join(__dirname, 'task'));
var data = require(path.join(__dirname, 'data'));
var files = require(path.join(__dirname, 'files'));
var taskDir = path.join(__dirname, '..', 'tasks-enabled');




/**
 * load
 * Loads all user files in the users-enabled directory
 * saves the users to the datastore
 * 
 * @param {loadCallback} cb - called back once all users loaded
 */
function load(callback) {
    files.getUserFiles(function(err, files) {
        if (err) throw new Error('could not load the tasks-enabled directory');
        
        // create users object to insert into the datastore
        var users = {};
        users['disabledUsers'] = {};
        users['enabledUsers'] = {};

        async.each(files, function(file, cb) {
            
            // give the file a full path
            var fileName = format.baseName(file);
            var filePath = path.join(taskDir, file);
            console.log('giving the file, ', file, 'a full path',
            fileName, filePath);

            user.loadAndValidateUser(filePath, function(err, u) {
                if (err) return cb(err);
                if (!u) return cb(null); // file is not a valid user
                
                // determine if user is enabled or disabled
                // push user into it's place
                if (!u.enabled) users.disabledTasks[fileName] = u; //@todo insert filename in [] //ccc
                if (u.enabled) users.enabledTasks[fileName] = u;
                
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




module.exports = {
    load: load
};
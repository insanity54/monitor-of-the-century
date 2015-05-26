// var fs = require('fs');
// var path = require('path');
// var data = require(path.join(__dirname, 'data'));
// var files = require(path.join(__dirname, 'files'));

// load user definitions

var path = require('path');
var async = require('async');
var user = require(path.join(__dirname, 'user'));
var data = require(path.join(__dirname, 'data'));
var files = require(path.join(__dirname, 'files'));
var userDir = path.join(__dirname, '..', 'users-enabled');
var format = require(path.join(__dirname, 'format'));



/**
 * load
 * Loads all user files in the users-enabled directory
 * saves the users to the datastore
 * 
 * @param {loadCallback} cb - called back once all users loaded
 */
function load(callback) {
    files.getUserFiles(function(err, files) {
        if (err) throw new Error('could not load the users-enabled directory');
        
        // create users object to insert into the datastore
        var users = {};
        users['disabledUsers'] = {};
        users['enabledUsers'] = {};

        async.each(files, function(file, cb) {
            
            // give the file a full path
            var fileName = format.baseName(file);
            var filePath = path.join(userDir, file);

            user.loadAndValidate(filePath, function(err, u) {
                if (err) return cb(err, null);
                if (!u) return cb(null); // file is not a valid user
                

                // determine if user is enabled or disabled
                // push user into it's place
                if (!u.enabled) users.enabledUsers[fileName] = u; //@todo insert filename in [] //ccc
                if (u.enabled) users.enabledUsers[fileName] = u;
                
                cb(null);
            });
        },
        function(err) {
            if (err) throw err;
            data.set('users', users, function(err, ok) {
                if (err) throw err;
                if (!ok) throw new Error('couldnt set users in datastore');
                return callback(null, users);
            });
        });
    });
}
/**
 * loadCallback
 * @callback {loadCallback}
 * @param {error} err
 * @param {array} users - list of valid users
 */




module.exports = {
    load: load,
    //watch: watch
};
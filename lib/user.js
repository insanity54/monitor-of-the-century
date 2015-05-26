var fs = require('fs');
var path = require('path');
var data = require(path.join(__dirname, 'data'));
var file = require(path.join(__dirname, 'file'));
var report = require(path.join(__dirname, 'report'));



/**
 * Loads a single user given it's filename. Calls back with true if a valid user
 * 
 * @param {String} userFile - filename of the user to load and validate
 * @param {loadedCallback} cb - callback handling the loaded user
 */
var loadAndValidate = function loadAndValidate(userFile, cb) {
    fs.readFile(userFile, {encoding: 'utf8'}, function(err, data) {
        if (err) return cb(err, null);
        if (!data) return cb(new Error('no data in user file'), null);
        //console.log("lets parse some data", data, userFile);
        file.parseJson(data, function(err, object) {
            if (err) {
                report.log({level: 'warn'}, 'file', userFile, 'is invalid JSON');
                return cb(null, false);
            }
            if (!object.email) {
                report.log({level: 'warn'}, 'file', userFile, 'is an invalid user file. It must contain \'email\' key/value');
                return cb(null, false);
            }
            return cb(null, object);
        });
    });
};
/**
 * loadedCallback
 * Callback handling the loaded user
 * 
 * @callback loadedCallback
 * @param {error} err - error if 
 * @param {object|false} object - javascript object representing the loaded user. false if json valid but user is not
 */




module.exports = {
    loadAndValidate: loadAndValidate
};
var fs = require('fs');
var path = require('path');
var data = require(path.join(__dirname, 'data'));
var file = require(path.join(__dirname, 'file'));




/**
 * Loads a single task given it's filename. Calls back with true if a valid task
 * 
 * @param {String} taskFile - filename of the task to load and validate
 * @param {loadedCallback} cb - callback handling the loaded task
 */
var loadAndValidate = function loadAndValidate(taskFile, cb) {
    //console.log('opeining task file', taskFile);
    fs.readFile(taskFile, {encoding: 'utf8'}, function(err, data) {
        if (err) return cb(err, null);
        if (!data) return cb(new Error('no data in task file'), null);
        file.parseJson(data, function(object) {
            if (err) return cb(null, false);
            if (!object) return cb(null, false);
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
 * @param {object} object - javascript object representing the loaded user 
 */




module.exports = {
    loadAndValidate: loadAndValidate
};
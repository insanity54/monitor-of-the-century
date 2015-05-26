var path = require('path');
var data = require(path.join(__dirname, 'data'));




/**
 * log
 * creates a report message in the datastore. report messages are temporarily saved until report.print is called.
 * 
 * @param {object} [options] - log options ofject. optional.
 * @param {string} [options.level] - log level. values to choose from are 'debug', 'notice', 'warn', 'critical'
 * @param {string} message - message to add to the report
 * @param {any} [messageExt] - more message to concatenate into message. continue adding as many params as you want, and they will be concatenated.
 * @returns {int} status - status code. 0 is good, non-zero is bad.
 */
var log = function log(options, message) {
    
};




/**
 * list
 * returns an array of report log messages already in the report (in the datastore)
 * 
 * @returns {array} messages - an array of messages in the report
 */
var list = function list() {
    
};




/**
 * print
 * displays a formatted report in the console
 * 
 * @returns {int} status - return code. 0 is good, non-zero is bad.
 */
var print = function print() {
    
};




module.exports = {
    log: log,
    list: list,
    print: print
};
//var nconf = require('nconf');
var path = require('path');
var data = require(path.join(__dirname, 'data'));




/**
 * notify
 * Uses the configured method to notify the specified person
 * 
 * @param {string} [name] - username to notify. If blank, admin is used.
 * @param {string} message - messate to send to the admin
 * @param {notifiedCallback} cb - function to call when notification is done
 */
var notify = function notify(name, message, cb) {
    if (!cb) {
        if (!message) throw new Error('only received one param. Need two or more.');
        if (typeof message == 'function') {
            // we're only getting a message and a callback
            cb = message;
            message = name;
        }
    }
    
    // get the configured notification method
    data.get('user:');
};
/**
 * notifiedCallback
 * @callback {notifiedCallback}
 * @param {error} err
 * @param {boolean} ok - true if notification successful
 */




module.exports = {
    notify: notify
};
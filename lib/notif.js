//var nconf = require('nconf');
var path = require('path');
var data = require(path.join(__dirname, 'data'));




/**
 * notify
 * Uses the configured method to notify the specified person
 * 
 * @param {object|string} options - if a string, it's the message to send.
 * @param {string} [options.name] - username of person to notify
 * @paran {string} [options.subject] - subject line of the notification
 * @param {string} options.message - message to send
 * @param {notifiedCallback} cb - function to call when notification is done
 */
var notify = function notify(options, cb) {
    var name;
    var subject;
    var message;
    
    if (!cb) {
        throw new Error('second param must be a callback function');
    }
    
    if (typeof options == 'object') {
        if (!options.message) throw new Error('you must specify a message to send (options.message)');
        name = options.name || null;
        subject = options.subject || null;
        message = options.message;
    }
    else {
        // options param must be a notification message
        if (typeof options != 'string') throw new Error('first param must be a string message or an object');
        name = null;
        subject = null;
        message = options;
    }
    
    // get the configured notification method
    data.get('users');
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
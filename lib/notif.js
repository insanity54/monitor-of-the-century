//var nconf = require('nconf');
var path = require('path');
var async = require('async');
var data = require(path.join(__dirname, 'data'));
var mail = require(path.join(__dirname, 'mail'));



// /**
//  * getUserMethod
//  * gets the notification method as configured in the user file.
//  *
//  * @param {string} name - the user name to get the notification method of
//  * @param {gotMethodCallback} cb - called back when method got
//  */
// var getUserMethod = function getUserMethod(cb) {
    
//     var method;
    
//     data.getUserByName(name, function(err, user) {
//         if (err) return cb(err, null);
        
//         method = user.method || 'email';
//         method = method.toString().toLowerCase();
        
//         // notify!
//         if (method == 'email' ||
//             method == 'e-mail' ||
//             method == 'mail') {
//             return cb(null, 'email');
//         }
//         else if (method == 'sms' ||
//                  method == 'text' ||
//                  method == 'txt') {
//             return cb(null, 'sms');
//         }
        
//         return cb(null, 'email');
//     });
// };
// /**
//  * gotMethodCallback
//  * @callback {gotMethodCallback}
//  * @param {error} err - errors if
//  * @param {string} method - the user's configured method or 'email' if none configured
//  */




/**
 * getParameters
 * interprets the user file data and gets the method (sms|txt|phone|carrierPigeon) and the recipient/sender address
 * Also sets defaults if values not set. Meant to be called by notify()
 * 
 * @param {object|string} options - if a string, it's the message to send.
 * @param {string} [options.name] - username of person to notify
 * @paran {string} [options.subject] - subject line of the notification
 * @param {string} options.message - message to send
 * @param {gotMethodCallback} cb
 */
var getParameters = function getParameters(options, cb) {
    var name;
    var subject;
    var message;
    var method;
    var sender;
    var recipient;
    var content = {};
    
    var defaultName = 'admin';
    var defaultMessage = 'default message';
    var defaultSubject = 'y2kmon alert';
    
    // get notif content
    if (!cb || typeof cb == 'string') {
        throw new Error('second param must be a callback function');
    }
    
    if (typeof options == 'object') {
        if (!options.message) throw new Error('you must specify a message to send (options.message)');
        name = options.name || defaultName;
        subject = options.subject || defaultSubject;
        message = options.message || defaultMessage;
    }
    else {
        // options param was not an object so it must be a notification message
        if (typeof options != 'string') throw new Error('first param must be a string message or an object');
        name = defaultName;
        subject = defaultSubject;
        message = options;
    }
    
    content['name'] = name;
    content['subject'] = subject;
    content['message'] = message;
    
    data.get('mail:sender', function(err, sender) {
        if (err) return cb(err, null);
        content['sender'] = sender;
        
        console.log('now looking up user', name);
        //console.log()
        data.getUserByName(name, function(err, u) {
            console.log('got user by name', name, err, u);
            if (err) return cb(err, null);
            content['method'] = u.method || 'email';
            content['recipient'] = u.email;
            return cb(null, content);
        });
    });
};
/**
 * gotMethodCallback
 * @callback {gotMethodCallback}
 * @param {error} err - error if there was a problem
 * @param {object} content - the content to sent to the mail/sms/phone module
 * @param {object} content.method - the method to use to notify the person
 * @param {string} content.name - username of person to notify
 * @paran {string} content.subject - subject line of the notification
 * @param {string} content.message - message to send
 * @param {string} content.sender - email address of sender (y2kmon)
 * @param {string} content.recipient - email address of person to notify
 */




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
    //console.log('>> get params')
    getParameters(options, function(err, content) {
        if (err) return cb(err, null);
        //console.log('>> got params: ', content);
        
        if (content.method == 'email') {
            mail.send(
                content.subject,
                content.message,
                content.recipient,
                content.sender,
                function (err, ok) {
                    if (err) return cb(err, null);
                    //console.log('>> done sending.');
                    return cb(null, true);
            });
        }
        else if (content.method == 'sms') {
            throw new Error('sms not implemented! https://github.com/insanity54/monitor-of-the-century/issues/1'); //@todo implement sms
        }
        else {
            throw new Error('method was not configured! FIX YA CODE');
        }
    });
};
/**
 * notifiedCallback
 * @callback {notifiedCallback}
 * @param {error} err - errors if user could not be found
 * @param {boolean} ok - true if notification successful
 */




module.exports = {
    notify: notify,
    getParameters: getParameters
};
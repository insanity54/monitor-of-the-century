// handler
// Handles the return data sent by the check module.


var path = require('path');


/**
 * handle
 * Handles the return data sent by check.execute
 * 
 * example
 * check.execute calls back with (null, 0).
 * handler would see this is a return status of 0, and do nothing.
 * 
 * example
 * check.execute calls back with (null, 2).
 * handler would see the check script returned with status code 2 (critical) so it would notify the admin
 * 
 * @param {error} err - error sent by check.execute
 * @param {int} code - return status code sent by check.execute
 * @param {string} [message] - return status message sent
 * @param {handledCallback} cb - callback for when handling is complete
 */
var handle = function handle(err, code, message) {
    
};
/**
 * handledCallback
 * called when handling is complete
 * 
 * @param {error} err
 * @param {boolean} ok - true if handing done sucessfully
 */


module.exports = {
    handle: handle
};
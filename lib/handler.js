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
 * @returns {int} 0 if handled ok, non-zero otherwise.
 */
var handle = function handle(err, code, message) {
    
    // if there is an error with the check script, notify admin
    if (err) return 
    //if (!cb) throw new Error('no callback function was passed');
    if (code == 2) {
        console.log('code 2', message);
    }
    else if (code == 1) {
        console.log('code 1', message);
    }
    else if (code == 0) {
        console.log('code 0', message);
    }
    else {
        console.log('unexpected code', code);
        return 2;
    }
    return 0;
};




module.exports = {
    handle: handle
};
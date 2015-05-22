// handler
// Handles the return data sent by the check module.


var path = require('path');
var notif = require(path.join(__dirname, 'notif'));



/**
 * handle
 * Handles the return data sent by check.execute
 * 
 * example
 * check.execute calls back with (null, {code: 0, ...})
 * handler would see this is a return status of 0, and do nothing.
 * 
 * example
 * check.execute calls back with (null, {code: 2, ...})
 * handler would see the check script returned with status code 2 (critical) so it would notify the admin
 * 
 * @param {error} err - error sent by check.execute
 * @param {object} result - results of check.execute
 * @param {int} result.code - return status code sent by check.execute
 * @param {string} [result.message] - optional stdout message returned by check.execute
 * @param {string} result.task - task name of the task that was responsible for calling check.execute
 * @param {handledCallback} [cb] - callback for when handling is complete. optionally used.
 *                                 calls back if this callback exists. If not used, function returns.
 * @returns {int} [status] - if callback not defined, returns status codes. 0 is good, non-zero is not good.
 */
var handle = function handle(err, result, cb) {
    // figure out if a callback is being used or not
    var _cb; typeof cb == 'function' ? _cb = true : _cb = false;
    
    // if there is an error with the check script, notify admin
    if (err) {
        notif.notify('error with '+result.task+'script: '+err, function(err, ok) {
            if (err) console.error(err);
            if (!ok) console.error(new Error('sending notification not ok'));
            if (!_cb) return 1;
            return cb(err, false);
        });
    }
    
    // throw if result wasn't received
    if (!result) throw new Error('handler.handle did not receive result object!');
    
    // handle return status code sent by check.execute
    if (result.code == 2) {
        // script returned CRITICAL.
        notif.notify(result.task+' is CRITICAL. ', function(err, ok) {
            if (err) console.error(err);
            if (!ok) console.error(new Error('not ok'));
            if (!_cb) return 0;
            return cb(null, true);
        });
    }
    else if (result.code == 1) {
        // script returned WARNING.
        //console.log('code 1', result.message);
        
    }
    else if (result.code == 0) {
        // script returned OK.
        //console.log('code 0', result.message);
    }
    else {
        console.log('unexpected code', result.code);
        if (!_cb) return 2;
        return cb(new Error('received unexpected code from check script'), false);
    }
    if (!_cb) return 0;
    return cb(null, true);
};
/**
 * handledCallback
 * Callback when handling is complete.
 * 
 * @callback {handledCallback}
 * @param {error} err
 * @param {boolean} ok - true if handling successful, false otherwise.
 */




module.exports = {
    handle: handle
};
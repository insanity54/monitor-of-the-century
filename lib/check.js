// execute a check
// this happens by running a child process with the check, with the arguments specified in the associated task.
// the return status of the check determines the result of the check.
//
// Exit codes
// 0 = OK
// 1 = WARNING
// 2 = CRITICAL

var path = require('path');
//var data = require(path.join(__dirname, 'data'));
var checksDir = path.join(__dirname, '..', 'checks');
var spawn = require('child_process').spawn;

/**
 * execute
 * executes the script and arguments specified.
 * expects 0, 1, or 2 as script's return status
 * 
 * @param {array} exec - array containing scriptname relative to checks directory, followed by arguments. ex: ['scriptname.sh', 'arg1', 'arg2']
 * @param {string} exec.
 * @param {executeCallback} cb
 */
var execute = function execute(exec, cb) {
    if (Object.prototype.toString.call(exec) !== '[object Array]') return cb(new Error('needs an array as first parameter'));
    if (!exec[0]) return cb(new Error('array must not be empty'));
    var script = exec.shift(); // get the first element of the exec array which should be the script
    var args = exec; // get the remaining array elements which are the script arguments

    var message = []; // array to buffer the return message into
    var result = {};  // object to send to the callback function
    var call = spawn(path.join(checksDir, script), args);
    call.stdout.on('data', function(chunk) {
        message.push(chunk.toString('utf8'));
    });
    call.stderr.on('data', function(chunk) {
        message.push(chunk.toString('utf8'));
    });
    call.on('close', function(code) {
        result['code'] = code;
        result['message'] = message.join('').toString('utf8');
        return cb(null, result);
    });
};
/**
 * @callback {executeCallback}
 * @param {error} err
 * @param {object} result - result of calling the script
 * @param {int} result.code - return status code of script
 * @param {string} result.message [message] - optional return message of script
 */




//     ps    = spawn('ps', ['ax']),
//     grep  = spawn('grep', ['ssh']);

// ps.stdout.on('data', function (data) {
//   grep.stdin.write(data);
// });

// ps.stderr.on('data', function (data) {
//   console.log('ps stderr: ' + data);
// });

// ps.on('close', function (code) {
//   if (code !== 0) {
//     console.log('ps process exited with code ' + code);
//   }
//   grep.stdin.end();
// });

// grep.stdout.on('data', function (data) {
//   console.log('' + data);
// });

// grep.stderr.on('data', function (data) {
//   console.log('grep stderr: ' + data);
// });

// grep.on('close', function (code) {
//   if (code !== 0) {
//     console.log('grep process exited with code ' + code);
//   }
// });

module.exports = {
  execute: execute
};
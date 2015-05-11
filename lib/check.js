// execute a check
// this happens by running a child process with the check, with the arguments specified in the associated task.
// the return status of the check determines the result of the check.
//
// Exit codes
// 0 = OK
// 1 = WARNING
// 2 = CRITICAL

var path = require('path');
var data = require(path.join(__dirname, 'data'));

var spawn = require('child_process').spawn;


    ps    = spawn('ps', ['ax']),
    grep  = spawn('grep', ['ssh']);

ps.stdout.on('data', function (data) {
  grep.stdin.write(data);
});

ps.stderr.on('data', function (data) {
  console.log('ps stderr: ' + data);
});

ps.on('close', function (code) {
  if (code !== 0) {
    console.log('ps process exited with code ' + code);
  }
  grep.stdin.end();
});

grep.stdout.on('data', function (data) {
  console.log('' + data);
});

grep.stderr.on('data', function (data) {
  console.log('grep stderr: ' + data);
});

grep.on('close', function (code) {
  if (code !== 0) {
    console.log('grep process exited with code ' + code);
  }
});
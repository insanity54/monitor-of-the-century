var forever = require('forever-monitor');

//forever.start ('ping.js');




var child = new (forever.Monitor)('ping.js', {
    max: 3,
    silent: false,
    args: []
});

child.on('exit', function () {
    console.log('ping.js has exited after 3 restarts');
});

child.start();
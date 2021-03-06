var path = require('path');
var express = require('express');
var nconf = require('nconf');

var app = express();

//  get the command line argument if there was one
//var argument = process.argv[2];

app.set('configFile', path.join(__dirname, 'config.json'));
nconf.file(app.get('configFile'));

// app.set('appDir', path.join(__dirname));
app.set('taskDir', path.join(__dirname, 'tasks-enabled'));
app.set('mailgunKey', nconf.get('MAILGUN_KEY'));
// app.set('centurylinkGateway', nconf.get('CENTURYLINK_GATEWAY'));
// app.set('textDown', nconf.get('ALERT_TEXT_DOWN'));
// app.set('textErr', nconf.get('ALERT_TEXT_SCRIPTERR'));
app.set('mailSender', nconf.get('MAIL_SENDER'));
// app.set('mailSubject', nconf.get('ALERT_SUBJECT'));
// app.set('mailRecipients', nconf.get('ALERT_RECIPIENTS'));
// app.set('stunPort', nconf.get('STUN_PORT'));
// app.set('stunServer', nconf.get('STUN_SERVER'));
// app.set('tasksEnabled', []); // populated on first run, modified when valid tasks are change in ./tasks-enabled


// include utility functions
require(path.join(__dirname, 'lib', 'watchTask'))(app);

// include control flow
require(path.join(__dirname, 'lib', 'main'))(app);


module.exports = app;
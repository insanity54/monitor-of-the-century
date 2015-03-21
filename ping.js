// ensure centurylink is connected. email alert if not

// include dependencies
var Mailgun = require('mailgun').Mailgun;
var schedule = require('node-schedule');
var nconf = require('nconf');
var path = require('path');
var stun = require('vs-stun');
var spawn = require('child_process').spawn;
var async = require('async');

//  get the command line argument if there was one
var argument = process.argv[2];

// get config data
nconf.file(path.join(__dirname, 'config.json'));
var mailgunKey = nconf.get('MAILGUN_KEY');
var centurylinkGateway = nconf.get('CENTURYLINK_GATEWAY');
var textDown = nconf.get('ALERT_TEXT_DOWN');
var textErr = nconf.get('ALERT_TEXT_SCRIPTERR');
var mailSender = nconf.get('ALERT_SENDER');
var mailSubject = nconf.get('ALERT_SUBJECT');
var mailRecipients = nconf.get('ALERT_RECIPIENTS');
var stunPort = nconf.get('STUN_PORT');
var stunServer = nconf.get('STUN_SERVER');

// initialize mailgun
var mg = new Mailgun(mailgunKey);


// functions
function sendEmail(text, cb) {
    console.log('sending email');
    mg.sendText(mailSender, mailRecipients, mailSubject, text, function(err) {
	if (err) return cb('could not send email');
	return cb(null);
    });
}

function getExternalIp(cb) {
    var socket, server = { host: stunServer, port: stunPort };
    var onConnect = function onConnect (err, val) {
        if (!err) {
            socket = val;
            //console.log(socket.stun.public.host);
            if (!socket.stun.public) return cb('STUN no worky', null);
            socket.close();
            
            return cb(null, socket.stun.public.host);
        }
        else console.log('Something went wrong: ' + err);
    };
    stun.connect(server, onConnect);
}

function identifyIsp(ip, cb) {
    var match;
    var child = spawn('host', [ip]); // runs host command in a terminal with the external ip address as sole parameter
    var centurylinkRegex = /(qwest.net|centurylink)/;
    var velocimaxRegex = /not found/;
    var googleRegex = /googleusercontent.com/;
    
    child.stdout.on('data', function(data) {
	//console.log('data ' + data);
        if (centurylinkRegex.test(data)) return match = 0;
        if (velocimaxRegex.test(data)) return match = 1;
        if (googleRegex.test(data))  return match = 2;
        match = 3;
    });
    
    child.on('close', function (code) {
	// if host exited with error, and we didn't find a regex match, exit with error.
        if (code !== 0 && match == 3) return cb('child host process exited with code ' + code, null);
        return cb(null, match);
    });
}

function investigateConnection(number, next) {
    //console.log('investgigating ' + number);
    
    getExternalIp(function(err, ip) {
	//if (err) console.log('there was an error getting ext ip');
        if (err) return next(err);
        
        identifyIsp(ip, function(err, isp) {
	    //if (err) console.log('there was an err identifying isp');
            if (err) return next(err);
            
            if (isp == 0) detectionCounts[0] += 1;
            if (isp == 1) detectionCounts[1] += 1;
            if (isp == 2) detectionCounts[2] += 1;
            if (isp == 3) detectionCounts[3] += 1;
            
            console.dir(detectionCounts);

	    return next(null);
        });
    });
}

function checkConnectionManyTimes(cb) {
    detectionCounts = [0, 0, 0, 0];
    async.times(15, investigateConnection, function(err) {
	if (err) return cb(err, null);
        if (detectionCounts[0] > 0) return cb(null, true);
        return cb(null, textDown);
    });
}

function checkCenturylink(cb) {
    checkConnectionManyTimes(function(err, status) {
        if (err) throw new Error('couldn\'t check many times. ' + err);
        if (status !== true) sendEmail(status, function(err) {
	    if (err) throw new Error('couldn\'t send email');
	}); // if status was a message, it's down. if status was true, it's up.
	return cb(null);
    });
}


// if there was a command line argument now, run once. Otherwise, schedule hourly runs.
if (argument == 'now') {
    
    // Identify the ISP in use many times. Centurylink is [0], Velocimax is [1].
    // When centurylink is found to be in use, [0] will increment by 1.
    // When velocimax is found to be in use, [1] will increment by 1.
    // After several checks, script will make sure centurylink was detected at least once.
    console.log('checking centrylink');
    checkCenturylink(function(err) {
	console.log('done checking');
    });

} else {
    // check every hour, alert if centurylink is down.
    schedule.scheduleJob('48 * * * *', function(){
        checkCenturylink();
    });
}



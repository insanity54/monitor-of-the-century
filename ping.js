// ping centurylink gateway. alert if not pingable

// include dependencies
var Mailgun = require('mailgun').Mailgun;
var schedule = require('node-schedule');
var nconf = require('nconf');
//var ping = require('ping');
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
function alarm(text) {
    console.log('function alarm');
    mg.sendText(mailSender, mailRecipients, mailSubject, text);
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

// function pingCentury() {
//     ping.sys.probe(centurylinkGateway, function(isAlive) {
//         if (!isAlive) return alarm(textDown);
//         console.log('century is up');
//     });
// }

function identifyIsp(ip, cb) {
    var match;
    var child = spawn('host', [ip]); // runs host command in a terminal with the external ip address as sole parameter
    var centurylinkRegex = /(qwest.net|centurylink)/;
    var velocimaxRegex = /not found/;
    var googleRegex = /googleusercontent.com/;
    
    child.stdout.on('data', function(data) {
        if (centurylinkRegex.test(data)) return match = 0;
        if (velocimaxRegex.test(data)) return match = 1;
        if (googleRegex.test(data)) return match = 2;
        return match = 3;
    });
    
    child.on('close', function (code) {
        if (code !== 0) return cb('child host process exited with code ' + code, null);
        return cb(null, match);
    });
}

function investigateConnection() {
    getExternalIp(function(err, ip) {
        if (err) return alarm(textErr + ': ' + err);
        
        identifyIsp(ip, function(err, isp) {
            if (err) return alarm(textErr + ': ' + err);
            
            if (isp == 0) detectionCounts[0] += 1;
            if (isp == 1) detectionCounts[1] += 1;
            if (isp == 2) detectionCounts[2] += 1;
            if (isp == 3) detectionCounts[3] += 1;
            
            console.dir(detectionCounts);
            
            //return cb(null);
        });
    });
}

function checkConnectionManyTimes(cb) {
    detectionCounts = [0, 0, 0, 0];
    async.times(15, investigateConnection, function(err, counts) {
        if (detectionCounts[0] > 0) return cb(null, true);
        return cb(null, textDown);
    });
}

function checkCenturylink() {
    checkConnectionManyTimes(function(err, status) {
        if (err) return alert(textErr + ': ' + err);
        if (status !== true) return alert(status); // if status was a message, it's down. if status was true, it's up.
        return false; // exit status 0?
    });
}


// if there was a command line argument now, run once. Otherwise, schedule hourly runs.
if (argument == 'now') {
    
    // Identify the ISP in use many times. Centurylink is [0], Velocimax is [1].
    // When centurylink is found to be in use, [0] will increment by 1.
    // When velocimax is found to be in use, [1] will increment by 1.
    // After several checks, script will make sure centurylink was detected at least once.
   checkCenturylink();

} else {
    // check every hour, alert if centurylink is down.
    schedule.scheduleJob('48 * * * *', function(){
        checkCenturylink();
    });
}





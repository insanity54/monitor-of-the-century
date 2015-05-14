var Mailgun = require('mailgun').Mailgun;
var nconf = require('nconf');
var path = require('path');

nconf.file(path.join(__dirname, '..', 'config.json'));


/**
 * mail
 * Sends a mail message
 * 
 * @param {string} subject - the mail subject line
 * @param {string} message - the text to send
 * @param {string} recepient - the recipient who will receive the message
 * @param {string} sender - the sender which will fill the FROM field
 * @param {sentCallback} cb - callback which is called once message sent or failed
 */
var send = function send(subject, message, recipient, sender, cb) {
    var mailgunKey = nconf.get('MAILGUN_KEY');
    var mg = new Mailgun(mailgunKey);
    mg.sendText(sender, recipient, subject, message, function(err) {
        if (err) return cb(err, null);
        return cb(null, true);
    });
};
/**
 * sentCallback
 * @callback {sentCallback}
 * @param {error} err - error if message failed to send
 * @param {boolean} ok - true if message sent successfully
 */




module.exports = {
    send: send
};
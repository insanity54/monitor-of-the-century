var Mailgun = require('mailgun').Mailgun;
var nconf = require('nconf');
var path = require('path');
var md5 = require('MD5');
var data = require(path.join(__dirname, 'data'));

nconf.file(path.join(__dirname, '..', 'config.json'));





/**
 * s
 * Sends a message, nothing else. Don't use this unless you know what you're doing.
 * Use send() instead. send() calls s()
 *
 * 
 * @param {string} subject - the mail subject line
 * @param {string} message - the text to send
 * @param {string} recepient - the recipient who will receive the message
 * @param {string} sender - the sender which will fill the FROM field
 * @param {sentCallback} cb - callback which is called once message sent or failed
 */
var s = function s(subject, message, recipient, sender, cb) {
    var mailgunKey = nconf.get('MAILGUN_KEY'); // @todo move mailgun key to datastore
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




/**
 * send
 * Sends a mail message. Also does anything else that should happen at the same time when mail is sent.
 * (stores a hash in the datastore of the message to be sent. used to check if message send was attempted)
 * 
 * @param {string} subject - the mail subject line
 * @param {string} message - the text to send
 * @param {string} recepient - the recipient who will receive the message
 * @param {string} sender - the sender which will fill the FROM field
 * @param {sentCallback} cb - callback which is called once message sent or failed
 */
var send = function send(subject, message, recipient, sender, cb) {
    if (typeof cb !== 'function') throw new Error('mail.send requires a callback function');
    data.set('mail:lastHash', md5(message), function(err, ok) {
        if (err) return cb(new Error('error saving message hash to datastore'), null);
        if (!ok) return cb(new Error('problem saving message hash to datastore: ', ok), null);
        
        //console.log('sending! >> ', subject, message, recipient, sender);
        s(subject, message, recipient, sender, function(err, ok) {
            //console.log('send completo', err, ok);
            if (err) return cb(err, null);
            return cb(null, true);
        });
    });
};
/**
 * sCallback
 * @callback {sCallback}
 * @param {error} err - error if message failed to send
 * @param {boolean} ok - true if message sent successfully
 */








module.exports = {
    send: send,
    s: s
};
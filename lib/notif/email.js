var Mailgun = require('mailgun').Mailgun;

var email = function email(app) {
    var mailgunKey = app.get('MAILGUN_KEY');
    var textDown = app.get('ALERT_TEXT_DOWN');
    var textErr = app.get('ALERT_TEXT_SCRIPTERR');
    var mailSender = app.get('ALERT_SENDER');
    var mailSubject = app.get('ALERT_SUBJECT');
    var mailRecipients = app.get('ALERT_RECIPIENTS');
    
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
    
    
};

module.exports = email;
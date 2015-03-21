# monitor-of-the-century
monitor centurylink

## Config

requires a file /config.json which contains the following directives:

  - MAILGUN_KEY
  - ALERT_SENDER
  - ALERT_RECIPIENTS
  - ALERT_SUBJECT
  - ALERT_TEXT_DOWN
  - ALERT_TEXT_SCRIPTERR
  - STUN_SERVER
  - STUN_PORT

example config file:

    {
        "MAILGUN_KEY": "9827498237498723984723987492374",
        "ALERT_SENDER": "chris@grimtech.net",
        "ALERT_RECIPIENTS": ["chris@grimtech.net"],
        "ALERT_SUBJECT": "CCC Alert",
        "ALERT_TEXT_DOWN": "Centurylink is down!",
        "ALERT_TEXT_SCRIPTERR": "there was a script error. plz check the script.",
        "STUN_SERVER": "stun.l.google.com"
        "STUN_PORT": 19302
    }

## run 

forever will keep the script going. run with `npm start`

## notes

  - pick a STUN server from this list: https://gist.github.com/zziuni/3741933
  - depends on cli `host` command

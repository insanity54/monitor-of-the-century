# monitor-of-the-century

When the main WAN connection goes down on a dual WAN router, alert the admin via e-mail.

I made this because one of the internet connections at my house goes down a lot. The dual WAN router seamlessly switches to the backup WAN and days go by before I know the main connection is down.

## Setup

It's a node app, probably only runs on *nix because there's a dependency on `host`. 

  - generate a `/config.json` file (see below)
  - npm install
  - npm test (optional, requires mocha, tests are incomplete and sukky.)
  
K now you have two options to keep this thing running in the background. One is untested and sukky, the other is tried and true.

**option 1**

just start the thing using `npm start`, and [forever] will keep it running. You'll have to keep it open in a screen session or something.

**option 2**

use upstart or systemd or init.d or whatever the cool kids use these days. Here's my `/etc/init/centuryMon.conf` upstart script:

    # starts my centurylink monitor script

    start on stopped rc RUNLEVEL=[2345]

    stop on runlevel [!2345]

    respawn
    setuid nod
    exec /usr/bin/node /home/nod/monitor-of-the-century/ping.js
    

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
        "MAILGUN_KEY": "key-2a8d38f57f293b857c382bd9a4b9e23e",
        "ALERT_SENDER": "chris@grimtech.net",
        "ALERT_RECIPIENTS": ["chris@grimtech.net"],
        "ALERT_SUBJECT": "CCC Alert",
        "ALERT_TEXT_DOWN": "Centurylink is down!",
        "ALERT_TEXT_SCRIPTERR": "there was a script error. plz check the script.",
        "STUN_SERVER": "stun.l.google.com",
        "STUN_PORT": 19302
    }

## notes

  - You can pick a STUN server from this list: https://gist.github.com/zziuni/3741933
  - depends on cli `host` command
  - made with hate by [Chris Grimmett] (Oops I mean love)

  

[forever]:https://www.npmjs.com/package/forever
[Chris Grimmett]:http://grimtech.net/about

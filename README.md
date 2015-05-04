# monitor-of-the-century

## About

Monitor your web services with this simple tool. Requires javascript and some packages downloadable from npm.


### Terminology

*Checks* are scripts which find the status of your services. Think nagios libexec. Checks return a value OK, WARNING, or CRITICAL.

*Tasks* are definitions that tell y2kmon when to do something, ie. execute a check script.

*Worker* The control flow for y2kmon. Loads checks, reads tasks. (This is really only important if you're developing y2kmon.)


### How it works

A task is created that tells y2kmon to check a service. A task is simply a json file:

    {
        "enabled": true,
        "check": "minecraft",
        "arguments": ["myminecraftserver.com"],
        "schedule": "48 * * * *"
    }
    
When the y2kmon process runs, it loads all valid tasks into memory, and runs the task when the *schedule* says to do so. A task tells y2kmon which *check* to use to see if the service is up or down. Any *arguments* the task contains are forwarded into the the *check*. The check returns OK, WARNING, or CRITICAL, which the proces can then handle.


## Notice

All enabled tasks are loaded into memory. This probably won't scale well.

    
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
  - TASKS_ENABLED

example config file:

    {
        "MAILGUN_KEY": "key-2a8d38f57f293b857c382bd9a4b9e23e",
        "ALERT_SENDER": "chris@grimtech.net",
        "ALERT_RECIPIENTS": ["chris@grimtech.net"],
        "ALERT_SUBJECT": "CCC Alert",
        "ALERT_TEXT_DOWN": "Centurylink is down!",
        "ALERT_TEXT_SCRIPTERR": "there was a script error. plz check the script.",
    }


## run 

forever will keep the script going. run with `npm start`


## notes

  - You can pick a STUN server from this list: https://gist.github.com/zziuni/3741933
  - depends on cli `host` command
  - made with hate by [Chris Grimmett] (Oops I mean love)

  

[forever]:https://www.npmjs.com/package/forever
[Chris Grimmett]:http://grimtech.net/about

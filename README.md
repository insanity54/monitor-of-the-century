# monitor-of-the-century

## About

Monitor your web services with this simple tool. Requires node.js and some packages downloadable from npm.


### Terminology

*Checks* - are scripts which find the status of your services. Think nagios libexec. Checks return a value OK, WARNING, or CRITICAL.

*Tasks* - are definitions that tell y2kmon when to do something, ie. execute a check script.

*Worker* - The control flow for y2kmon. Loads checks, reads tasks. (This is really only important if you're developing y2kmon.)

*Jobs* - These are only used in the context of the schedule module. A scheduling job is created which runs a task every so often.


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
  - NOTIF_SENDER
  - NOTIF_RECIPIENTS
  - NOTIF_SUBJECT_PREFIX


example config file:

    {
        "MAILGUN_KEY": "key-2a8d38f57f293b857c382bd9a4b9e23e",
        "NOTIF_SENDER": "chris@grimtech.net",
        "NOTIF_RECIPIENTS": ["chris@grimtech.net"],
        "NOTIF_SUBJECT_PREFIX": "CCC Alert",
    }


## run 

run with `npm start`


## notes

  - the centurylink check script needs a stun server. You can pick a STUN server from this list: https://gist.github.com/zziuni/3741933
  - the centurylink check script depends on cli `host` command (only tested on linux)
  - made with hate by [Chris Grimmett] ...Oops I mean love


[Chris Grimmett]:http://grimtech.net/about

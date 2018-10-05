# monitor-of-the-century

[![Greenkeeper badge](https://badges.greenkeeper.io/insanity54/monitor-of-the-century.svg)](https://greenkeeper.io/)

## About

Monitor your services with this simple tool. Requires node.js and some packages downloadable from npm.


## Setup

create a file /config.json which contains the following directives:

  - MAILGUN_KEY
  - MAIL_SENDER


optional directives:
 
  - NOTIF_SUBJECT_PREFIX


example config file:

```
{
    "MAILGUN_KEY": "key-2a8d38f57f293b857c382bd9a4b9e23e",
    "MAIL_SENDER": "chris@grimtech.net",
    "NOTIF_SUBJECT_PREFIX": "CCC Alert",
}
```

Next add your nagios-style check scripts to the checks directory. The check scripts are what do the actual work of checking your services. You can make your own or download common pre-made scripts from exchange.nagios.com. A check script must return 0 for OK, 1 for WARNING, or 2 for CRITICAL. y2kmon notifies the admin if a script returns 1 or 2, along with any text sent on stdout.

There is an example check script in the check directory already, called `check_file_exists.sh`


Now create some tasks. Tasks are what y2kmon uses to schedule the check scripts. Tasks are json files that go in the tasks-enabled directory.

An example task file:

```
{
    "name": "File existance check",
    "description": "a task that runs every hour and detects if a file exists or not.",
    "enabled": true,
    "check": "check_file_exists",
    "arguments": ["/dev/random"],
    "schedule": "0 * * * *"
}
```

Above we see there a bunch of key/values, but not all of them are required. The only required key/values are `check` and `schedule`. The `check` directive tells y2kmon which check script to run, and the `schedule` directive tells y2kmon when to run the check. `check` needs the base file name of the check script, ex: `check_file_exists` without the `.sh`. `schedule` needs a cron-style date. For more information about cron, [Wikipedia has good article about cron](http://en.wikipedia.org/wiki/Cron), or you can see the [node-schedule notes]((https://github.com/node-schedule/node-schedule/wiki/Cron-style-Scheduling).

Another important directive is `arguments`. Whatever is in this array is passed to the check script. In the above example, `check_file_exists.sh` gets the argument, `/dev/random`.

// @todo add another example


Finally, you need one or more users. Users are added a lot like tasks. In the users-available directory, you'll find a default user file, admin.json:

```
{
    fullname: "Chris Grimmett",
    email: "chris@grimtech.net",
    phone: "12346781234",
    method: "email"
}
```

Go ahead and edit this file with your info. Since the file is in the users-available directory, y2kmon will ignore it. The users-enabled and users-available directories are an idea that comes from the good old apache web server. The available directory is for files you don't want to use right now, but want to keep around. Once you're ready to use the file, create a symlink or move the file to the users-enabled directory, and y2kmon will use it.

Once y2kmon has your configurations, check scripts, task and user definitios, it's all set to run. 

## run 

```
$ npm install
$ npm start
```

You add, remove, create, or update any task, user, and check files while y2kmon is running. Just update the files and y2kmon will detect the changes. No restarting or reloading required.


## notes

  - the centurylink check script needs a stun server. You can pick a STUN server from this list: https://gist.github.com/zziuni/3741933
  - the centurylink check script depends on cli `host` command (only tested on linux)
  - made with hate by [Chris Grimmett] ...Oops I mean love


### Terminology

*Checks* - are scripts which find the status of your services. Think nagios libexec. Checks return a value OK, WARNING, or CRITICAL.

*Tasks* - are definitions that tell y2kmon when to do something, ie. execute a check script.

*Worker* - The control flow for y2kmon. Loads checks, reads tasks. (This is really only important if you're developing y2kmon.)

*Jobs* - These are only used in the context of the schedule module. A scheduling job is created which runs a task every so often.


### How it works

A task is created that tells y2kmon to check a service. A task is simply a json file:

```
{
    "enabled": true,
    "check": "minecraft",
    "arguments": ["myminecraftserver.com"],
    "schedule": "48 * * * *"
}
```

When the y2kmon process runs, it loads all valid tasks into memory, and runs the task when the *schedule* says to do so. A task tells y2kmon which *check* to use to see if the service is up or down. Any *arguments* the task contains are forwarded into the the *check*. The check returns OK, WARNING, or CRITICAL, which the proces can then handle.


## Notice

All enabled tasks are loaded into memory. This probably won't scale well.



## Desired workflow

I want y2kmon to be super simple for new users. The workflow should be like this:

* add e-mail address and mailgun key to config.json
* `$ npm install`
* `$ npm run`
* put nagios scripts in the checks directory
* put task json definitions in the tasks-enabled directory




[Chris Grimmett]:http://grimtech.net/about

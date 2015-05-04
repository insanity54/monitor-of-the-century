// watches task dir for changes
var fs = require('fs');
var path = require('path');

var watchTask = function watchTask(app) {
    //console.log('appdir: ', app.get('appDir'));
    //nconf.file(path.join(app.get('appDir'), 'config.json'));
    
    var taskDir = app.get('taskDir');
    
    // watch the task directory for changes
    fs.watch(taskDir, { persistent: true, recursive: false }, function(event, filename) {
        filename = path.join(taskDir, filename);
        //console.log('change detected in task dir. ', event, filename);
        //console.dir(event);
        
        // if task has extension '.json'
        if (path.extname(filename) == '.json') {
            // see if file is still there (fs.watch only really registers 'rename' events)
            fs.readFile(filename, function(err, data) {
                if (err) return console.error('Task detected but could not load', filename);
                if (!data) throw new Error('no data when reading task file');
                
                try {
                   var task = JSON.parse(data);
                }
                catch (exception) {
                   console.error('could not parse task', filename);
                   
                }
                
                // finally {
                //     console.log('finally');
                // }
                // we parsed the task
                
                // validate the task
                if (!task.hasOwnProperty('check') ||
                    !task.hasOwnProperty('schedule')) {
                    return console.error('not a valid task file', filename);
                }
                // make sure task has 'enabled: true' or no enabled directive
                if (task.hasOwnProperty('enabled')) {
                    if (!task.enabled) return console.error('task is disabled');
                }
                console.log('a valid, enabled task file', path.basename(filename));
                app.set('tasksEnabled', app.get('tasksEnabled').concat[path.basename(filename, '.json')]);
                console.log('tasksEnabled-', app.get('tasksEnabled'));
                // nconf.set('TASKS_ENABLED', nconf.get('TASKS_ENABLED').concat([path.basename(filename, '.json')]));
                // nconf.load(function(err) {  // get any config changes since app started
                //     if (err) throw new Error('error syncing config before save');
                //     nconf.save(function(err) { // set this task as enabled 
                //         if (err) throw new Error('error saving to nconf');
                //         console.log('saved');
                //     });
                // });
            });
        }
    });
};

module.exports = watchTask;
// load enabled tasks when app runs

var fs = require('fs');
var path = require('path');
var task = require(path.join(__dirname, '..', 'task'));
var async = require('async');


var loadTasks = function loadTasks(app) {
    
    var taskDir = app.get('taskDir');
    
    fs.readdir(taskDir, function(err, files) {
        if (err) throw new Error('could not read tasks directory');
        //console.log('tasks found', files);

        //each(arr, iterator, callback)
        async.each(files, function(file, cb) {
          
            // Perform operation on file here. 
            console.log('Processing file ' + file);
          
                
            task.loadTask(path.join(taskDir, file), function(err, loaded) {
                if (err) throw err;
                if (loaded) {
                    // add the file
                    app.set('tasksEnabled', app.get('tasksEnabled').concat(file));
                    console.log(app.get('tasksEnabled'));
                }
            });
            
            
          
          if( file.length > 32 ) {
            console.log('This file name is too long');
            callback('File name too long');
          } else {
            // Do work to process file here 
            console.log('File processed');
            callback();
          }
        }, function(err){
            // if any of the file processing produced an error, err would equal that error 
            if( err ) {
              // One of the iterations produced an error. 
              // All processing will now stop. 
              console.log('A file failed to process');
            } else {
              console.log('All files have been processed successfully');
            }
        });

        function repeater(i) {
            if( i < files.length ) {
                var file = files[i];
                
                task.loadTask(path.join(taskDir, file), function(err, loaded) {
                    if (err) throw err;
                    if (loaded) {
                        app.set('tasksEnabled', app.get('tasksEnabled').concat(file));
                        console.log(app.get('tasksEnabled'));
                    }
                });
                repeater( i + 1 );
            }
        }
        repeater(0);
    });
};

module.exports = loadTasks;
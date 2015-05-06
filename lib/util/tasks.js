// load enabled tasks

var path = require('path');
var task = require(path.join(__dirname, '..', 'task', 'task'));
var files = require(path.join(__dirname, 'files'));
var async = require('async');


var loadTasks = function loadTasks(app) {
    
    files.getTaskFiles(function(err, files) {
        if (err) throw new Error('could not load the tasks-enabled directory');

        //each(arr, iterator, callback)
        async.each(files, function(file, cb) {
          
            // Perform operation on file here. 
            console.log('Processing file ' + file);
          
            task.loadAndValidateTask(file, function(err, task) {
                if (err) throw err;
                if (!task) throw new Error('there was no task');
                
                // add the task to the enabled list (in memory)
                app.set('tasksEnabled', app.get('tasksEnabled').concat(file));
                console.log('here is the task list:', app.get('tasksEnabled'));
                
                return cb(null);
            });
        });
    });
};
            
            
          
        //   if( file.length > 32 ) {
        //     console.log('This file name is too long');
        //     callback('File name too long');
        //   } else {
        //     // Do work to process file here 
        //     console.log('File processed');
        //     callback();
        //   }
        // }, function(err){
        //     // if any of the file processing produced an error, err would equal that error 
        //     if( err ) {
        //       // One of the iterations produced an error. 
        //       // All processing will now stop. 
        //       console.log('A file failed to process');
        //     } else {
        //       console.log('All files have been processed successfully');
        //     }
        // });

        // function repeater(i) {
        //     if( i < files.length ) {
        //         var file = files[i];
                
        //         task.loadTask(path.join(taskDir, file), function(err, loaded) {
        //             if (err) throw err;
        //             if (loaded) {
        //                 app.set('tasksEnabled', app.get('tasksEnabled').concat(file));
        //                 console.log(app.get('tasksEnabled'));
        //             }
        //         });
        //         repeater( i + 1 );
        //     }
        // }
        // repeater(0);
//     });
// };

module.exports = loadTasks;
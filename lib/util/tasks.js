// // load enabled tasks when app runs

// var fs = require('fs');
// var path = require('path');
// var task = require(path.join(__dirname, 'task'));


// var loadTasks = function loadTasks(app) {
    
//     var taskDir = app.get('taskDir');
    
//     fs.readdir(taskDir, function(err, files) {
//         if (err) throw new Error('could not read tasks directory');
//         //console.log('tasks found', files);

//         function repeater(i) {
//             if( i < files.length ) {
//                 var file = files[i];
                
//                 task.loadTask(path.join(taskDir, file), function(err, loaded) {
//                     if (err) throw err;
//                     if (loaded) {
//                         app.set('tasksEnabled', app.get('tasksEnabled').concat(file));
//                         console.log(app.get('tasksEnabled'));
//                     }
//                 });
//                 repeater( i + 1 );
//             }
//         }
//         repeater(0);
//     });
// };

// module.exports = loadTasks;
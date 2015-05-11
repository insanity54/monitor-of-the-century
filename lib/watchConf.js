// reloads config file when changes detected
var fs = require('fs');


var watchConf = function watchConf(app) {
    fs.watch(app.get('configFile'), 
    
};

module.exports = watchConf;
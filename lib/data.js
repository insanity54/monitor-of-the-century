// datastore. could be replaced with a database
// The following keys are reserved
//
// tasks
// mail:lastHash


var store = {};

/**
 * get
 * gets a value from the store
 * 
 * @param {String} key
 * @param {getCallback} cb
 */
var get = function get(key, cb) {
    if (!store[key]) return cb(new Error('there is no key', key, 'in the datastore.'), null);
    return cb(null, store[key]);
}
/**
 * @callback {getCallback}
 * @param {error} err
 * @param {String} value
 */




/**
 * set
 * sets a value in the store
 * 
 * @param {String} key
 * @param {String} value
 * @param {setCallback} cb
 */
var set = function set(key, value, cb) {
    var eMsg = new Error('set got unexpected parameters. '+ key + value + cb + ' please check your code.');
    if (typeof key !== 'string') throw eMsg;
    if (typeof cb !== 'function') throw eMsg;
    store[key] = value;
    return cb(null, true);
}
/**
 * @callback {setCallback}
 * @param {error} err
 * @param {bool} ok - true if value was set sucessfully
 */
 



/**
 * getTaskByName
 * gets the task object given a task name.
 * task names are  by the task module when a task is loaded into the datastore
 *
 * @param {string} name - the name (filename without extension) of the task to get
 * @param {gotTaskByIdCallback} cb
 */
var getTaskByName = function getTaskByName(name, cb) {
    //console.log('getTaskByName::', name);
    get('tasks', function(err, tasks) {
        if (err) throw err;
        if (!tasks) throw new Error('Tasks not found in datastore. Are there tasks in the tasks-enabled directory? Has tasks.load() run?');
        return cb(null, tasks.enabledTasks[name]);
    });
};
/**
 * gotTaskByIdCallback
 * called when task has been retrieved from the datastore
 * 
 * @callback {gotTaskByIdCallback}
 * @param {error} err
 * @param {object} task - the task object which was loaded. identical to the task json except it's js not json, and it's got an _id key/value.
 */
 
 
 
 
 
/**
 * getTasks
 * convenience method which gets the tasks object from the datastore
 * 
 * @param {gotTasksCallback} cb
 */
var getTasks = function getTasks(cb) {
    get('tasks', function(err, tasks) {
        if (err) return cb(err, null);
        return cb(null, tasks);
    });
};
/**
 * gotTasksCallback
 * @callback {gotTasksCallback}
 * @param {error} err
 * @param {object} tasks
 */




module.exports = {
    get: get,
    set: set,
    getTaskByName: getTaskByName,
    getTasks: getTasks
};
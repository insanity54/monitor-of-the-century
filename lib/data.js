// datastore. could be replaced with a database
// The following keys are reserved
//
// tasks
// users
// mail:lastHash
// mail:sender




var store = {};




/**
 * get
 * gets a value from the store
 * 
 * @param {String} key
 * @param {getCallback} cb
 */
var get = function get(key, cb) {
    if (!cb) throw new Error('get requires a callback');
    if (!store[key]) return cb(new Error('there is no key, '+key+' in the datastore.'), null);
    return cb(null, store[key]);
};
/**
 * @callback {getCallback}
 * @param {error} err
 * @param {String} value
 */




/**
 * getSync
 * gets a value from the store (sycronously)
 * 
 * @param {string} key - the key to get
 * @returns {string} value - the value associated with the key
 */
var getSync = function getSync(key) {
    if (typeof key !== 'string') throw new Error('getSync expects a single string parameter');
    return store[key];
};




/**
 * set
 * sets a value in the store
 * 
 * @param {string} key
 * @param {string} value
 * @param {setCallback} cb
 */
var set = function set(key, value, cb) {
    var eMsg = new Error('set got unexpected parameters. '+ key + value + cb + ' please check your code.');
    if (typeof key !== 'string') throw eMsg;
    if (typeof cb !== 'function') throw eMsg;
    store[key] = value;
    return cb(null, true);
};
/**
 * @callback {setCallback}
 * @param {error} err
 * @param {bool} ok - true if value was set sucessfully
 */




/**
 * setSync
 * sets a value in the store
 * 
 * @param {string} key - the key to set
 * @param {string} value - the value to set
 * @returns {int} result - 0 set successfully
 */
var setSync = function setSync(key, value) {
    if (typeof key !== 'string') throw new Error('set got unexpected parameters. '+ key + value + ' please check code.');
    store[key] = value;
    return 0;
};




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
 * @param {object} task - the task object which was loaded. identical to the task json except it's js not json.
 */
 
 
 
 
 /**
  * getUserByName
  * gets the user object given the user's name
  * 
  * @param {string} name - the name (filename without extension) of the user to get.
  *                        example: for the user defined in admin.json, name will be 'admin'.
  * @param {gotUserCallback} cb - called back when user object found
  */
var getUserByName = function getUserByName(name, cb) {
    get('users', function(err, users) {
        if (err) throw err;
        if (!users) throw new Error('Users not found in datastore. Are there users in the users-enabled directory? Has users.load() run?');
        if (!users.enabledUsers[name]) return cb(new Error('user does not exist'), null);
        return cb(null, users.enabledUsers[name]);
    });
};
/**
 * gotUserCallback
 * @callback {gotUserCallback}
 * @param {error} err - error if .get() had an error or if specified user does not exist
 * @param {object} user - the user object which was loaded.
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
    getSync: getSync,
    set: set,
    setSync: setSync,
    getTaskByName: getTaskByName,
    getUserByName: getUserByName,
    getTasks: getTasks
};
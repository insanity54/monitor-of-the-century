// datastore. could be replaced with a database
// holds the following info
//
// * enabled tasks
// * disabled tasks


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
};
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
    if (typeof key != 'string') throw eMsg;
    if (typeof value != 'string') throw eMsg;
    if (typeof cb !== 'function') throw eMsg;
    store[key] = value;
    return cb(null, true);
};
/**
 * @callback {setCallback}
 * @param {error} err
 * @param {bool} ok - true if value was set sucessfully
 */
 
 
module.exports = {
    get: get,
    set: set
};
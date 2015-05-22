// misc file functions




/**
 * parseJson
 * parses json data, calls back with js object if valid json
 * 
 * @param {string} json - the data to parse
 * @param {parsedCallback} cb
 */
var parseJson = function parseJson(json, cb) {
    try { var j = JSON.parse(json); }
    catch (e) { return cb(new Error('json is not valid', e), null); }
    return cb(null, j);
};
/**
 * Callback handling of the validated task
 * @callback parsedCallback
 * @param {error} err - error if not valid json
 * @param {object} json - js object of json if json was valid.
 */




module.exports = {
    parseJson: parseJson
};
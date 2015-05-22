// various functions for formatting data



/**
 * baseName
 * returns the basename of a filename
 * greets to https://stackoverflow.com/questions/3820381/need-a-basename-function-in-javascript
 * 
 * @param {string} str - string to get basename of. example: "test.json"
 * @returns {string} base - basename of str. example: "test"
 */
function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
    return base;
}



module.exports = {
    baseName: baseName
};
var _ = require('lodash');

/**
 * @param {*} value
 * @returns {*}
 */
exports.toValue = function (value) {
    return _.isFunction(value) ? value() : value;
};

/**
 * @param {*} value
 * @returns {*[]}
 */
exports.toArray = function (value) {
    value = this.toValue(value);
    return _.isArray(value) ? value : [value];
};

/**
 * @param {*} value
 * @returns {Object}
 */
exports.toObject = function (value) {
    value = this.toValue(value);
    if (_.isObject(value)) {
        return value;
    }
    throw Error("index.data was not an object. Value is ignored.")
};

/**
 * @param {string} url
 * @returns {string}
 */
exports.toAbsoluteURL = function(url) {
    if (/^(https?|file|ftp):\/\//.test(url)) {
        return url;
    }
    if (url[0] != '/') {
        url = '/' + url;
    }
    return url;
}

var _ = require('lodash');

exports.toValue = function (value) {
    return _.isFunction(value) ? value() : value;
};

exports.toArray = function (value) {
    value = this.toValue(value);
    return _.isArray(value) ? value : [value];
};

exports.toObject = function (value) {
    value = this.toValue(value);
    if (_.isObject(value)) {
        return value;
    }
    throw Error("index.data was not an object. Value is ignored.")
};

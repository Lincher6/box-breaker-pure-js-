const {ValidationError} = require("../lib/errors");
const {MAX_INT, MIN_INT} = require("../lib/constants");

module.exports = (value) => {
    validate(value);

    const string = String(value);
    const chars = string.split('');
    return chars.reverse().join('') === string;
}

function validate(value) {
    if (typeof value === 'string') {
        if (isNaN(value)) {
            throw new ValidationError('string value is not a number');
        } else {
            value = +value;
        }
    }

    if (typeof value !== 'number') {
        throw new ValidationError('value is not a number');
    } else if (!Number.isInteger(value)) {
        throw new ValidationError('value must be an integer');
    } else if (value > MAX_INT || value < MIN_INT) {
        throw new ValidationError('value is out of range');
    }
}
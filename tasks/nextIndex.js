const {ArrayDataError} = require("../lib/errors");

module.exports = (value, target) => {
    validate(value, target);

    for (let i in value) {
        if (value.hasOwnProperty(i)) {
            if (value[i] === target || value[i] > target) {
                return +i;
            }
        }
    }
    return +value.length;
}

function validate(value, target) {
    if (!Array.isArray(value)) {
        throw new TypeError("value is not an Array");
    } else if (value.some(el => typeof el !== 'number')) {
        throw new ArrayDataError("Array elements must be numbers");
    } else if (JSON.stringify([...value].sort()) !== JSON.stringify(value)) {
        throw new ArrayDataError("Array must be sorted");
    } else if (typeof target !== 'number') {
        throw new TypeError("target must be a number");
    }
}
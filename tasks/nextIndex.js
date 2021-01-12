const {ValidationError} = require("../lib/errors");

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
        throw new ValidationError("nums is not an Array");
    } else if (value.some(el => typeof el !== 'number')) {
        throw new ValidationError("nums elements must be numbers");
    } else if (JSON.stringify([...value].sort()) !== JSON.stringify(value)) {
        throw new ValidationError("nums must be sorted");
    } else if (typeof target !== 'number') {
        throw new ValidationError("target must be a number");
    }
}
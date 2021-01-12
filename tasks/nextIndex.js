const {ValidationError} = require("../lib/errors");
const {validateArray} = require("../lib/utils");
const {MAX_INT, MIN_INT} = require("../lib/constants");

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

function validate(nums, target) {
    const sortNumbers = (arr) => [...arr].sort((a, b) => a - b);

    validateArray(nums, 'nums', {checkIntegers: true, checkDistinct: true})

    if (JSON.stringify(sortNumbers(nums)) !== JSON.stringify(nums)) {
        throw new ValidationError("nums must be sorted");
    } else if (typeof target !== 'number') {
        throw new ValidationError("target must be a number");
    } else if (target > MAX_INT) {
        throw new ValidationError(`target must be less than ${MAX_INT}`);
    } else if (target < MIN_INT) {
        throw new ValidationError(`target must be more than ${MIN_INT}`);
    } else if (target % 1 !== 0) {
        throw new ValidationError("target must be an integer, got float");
    }
}
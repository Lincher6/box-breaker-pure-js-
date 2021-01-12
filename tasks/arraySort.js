const {validateArray} = require("../lib/utils");
const {ValidationError} = require("../lib/errors");
const {MAX_INT} = require("../lib/constants");

module.exports = (arr1, arr2) => {
    validate(arr1, arr2);

    const numbers = {other: []};

    arr1.forEach(number => {
        if (arr2.includes(number)) {
            if (numbers[number]) {
                numbers[number].push(number);
            } else {
                numbers[number] = [number];
            }
        } else {
            numbers.other.push(number);
        }
    })

    const result = arr2.reduce((acc, number) => {
        acc.push(...numbers[number]);
        return acc;
    }, []);

    numbers.other = numbers.other.sort((a, b) => a - b);
    result.push(...numbers.other);
    return result;
}

function validate(arr1, arr2) {
    validateArray(arr1, 'first', {
        maxLength: 1000,
        maxValue: MAX_INT,
        minValue: 1,
        checkIntegers: true,
    });
    validateArray(arr2, 'second', {
        maxLength: 1000,
        maxValue: 1000,
        minValue: 1,
        checkIntegers: true,
        checkDistinct: true
    });

    if (arr2.some(el => !arr1.includes(el))) {
        throw new ValidationError("all second array elements must be in first array");
    }
}
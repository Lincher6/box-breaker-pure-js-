const {ValidationError} = require("../lib/errors");

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
    const MAX_LENGTH = 1000;
    const MAX_VALUE = 1000;

    const isDistinct = (arr) => {
        const distinct = {};
        return !arr.some(el => {
            if (distinct[el]) {
                return true;
            }
            distinct[el] = true;
        })
    }

    if (!Array.isArray(arr1)) {
        throw new ValidationError("first argument is not an array");
    } else if (!Array.isArray(arr2)) {
        throw new ValidationError("second argument is not an array");
    } else if (arr1.length === 0) {
        throw new ValidationError("first array must not be empty");
    } else if (arr2.length >= MAX_LENGTH) {
        throw new ValidationError("second array is too big. max=1000");
    } else if (arr1.some(el => el < 1 || typeof el !== 'number')) {
        throw new ValidationError("first array elements must be positive numbers");
    } else if (arr2.some(el => el > MAX_VALUE || typeof el !== 'number')) {
        throw new ValidationError("second array elements must be numbers less than 1000");
    } else if (!isDistinct(arr2)) {
        throw new ValidationError("second array elements must be distinct");
    } else if (arr2.some(el => !arr1.includes(el))) {
        throw new ValidationError("all second array elements must be in first array");
    }
}
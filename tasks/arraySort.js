const {RequiredError, ArrayDataError} = require("../lib/errors");

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
        throw new TypeError("First argument is not an array");
    } else if (!Array.isArray(arr2)) {
        throw new TypeError("Second argument is not an array");
    } else if (arr1.length === 0) {
        throw new RequiredError("First array must not be empty");
    } else if (arr2.length >= 1000) {
        throw new RangeError("Second array is too big. max=1000");
    } else if (arr1.some(el => el < 1 || typeof el !== 'number')) {
        throw new ArrayDataError("First array elements must be positive numbers");
    } else if (arr1.some(el => el > 1000 || typeof el !== 'number')) {
        throw new ArrayDataError("Second array elements must be numbers less than 1000");
    } else if (!isDistinct(arr2)) {
        throw new ArrayDataError("Second array elements must be distinct");
    } else if (arr2.some(el => !arr1.includes(el))) {
        throw new ArrayDataError("All second array elements must be in first array");
    }
}
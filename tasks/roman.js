const {ValidationError} = require("../lib/errors");

module.exports = (value) => {
    validate(value);

    const digits = {
        CM: 900,
        M: 1000,
        CD: 400,
        D: 500,
        XC: 90,
        C: 100,
        XL: 40,
        L: 50,
        IX: 9,
        X: 10,
        IV: 4,
        V: 5,
        I: 1
    };

    return Object.keys(digits).reduce((acc, key) => {
        while (value.includes(key)) {
            value = value.replace(key, '');
            acc += digits[key];
        }
        return acc;
    }, 0);
}

function validate(value) {
    const LETTERS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    const MAX_LENGTH = 15;
    if (typeof value !== 'string') {
        throw new ValidationError('input is not a string');
    } else if (value.length > MAX_LENGTH) {
        throw new ValidationError('roman number is too big');
    } else if (value.length === 0) {
        throw new ValidationError('input is empty');
    } else if (value.split('').some(letter => !LETTERS.includes(letter))) {
        throw new ValidationError('not a roman number');
    }
}
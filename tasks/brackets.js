const {ValidationError} = require("../lib/errors");

module.exports = (value) => {
    validate(value);

    const openBrackets = [];
    const brackets = value.split('');
    const valid = !brackets.some(bracket => {
        switch (bracket) {
            case '(': openBrackets.push('('); break;
            case '{': openBrackets.push('{'); break;
            case '[': openBrackets.push('['); break;
            case ')': return openBrackets.pop() !== '(';
            case '}': return openBrackets.pop() !== '{';
            case ']': return openBrackets.pop() !== '[';
        }
    })

    return openBrackets.length === 0 && valid;
}

function validate(value) {
    const CHARS = ['(', '{', '[', ']', '}', ')'];
    const MAX_LENGTH = 104;

    if (typeof value !== 'string') {
        throw new ValidationError('value is not a string');
    } else if (value.length > MAX_LENGTH) {
        throw new ValidationError('string is too long');
    } else if (value.length === 0) {
        throw new ValidationError('value is empty');
    }

    const brackets = value.split('');
    if (brackets.some(bracket => !CHARS.includes(bracket))) {
        throw new ValidationError('invalid characters');
    }
}
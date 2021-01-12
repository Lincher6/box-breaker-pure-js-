const got = require('got');
const {ValidationError} = require("./errors");
const {MIN_INT, MAX_INT} = require("./constants");

module.exports = {
    callWithResponse({ fn, res, params }) {
        try {
            const result = fn(...params);
            res.status(200).json({ result });
        } catch (e) {
            if (e.name === 'ValidationError') {
                res.status(400).json({ message: e.message });
            } else {
                res.status(500).json({ message: e.message });
            }
        }
    },

    jsonParser(req, res, next){
        let data = "";
        req.on('data', function(chunk){ data += chunk});
        req.on('end', function(){
            req.rawBody = data;
            try {
                req.body = JSON.parse(data);
                if (typeof req.body !== 'object') {
                    return res.status(500).json({ message: 'JSON is not an object' });
                }
            } catch (e) {
                return res.status(500).json({ message: 'body is not a JSON' });
            }
            next();
        });
    },

    getGot() {
        const instance = got.extend({
            prefixUrl: 'http://localhost:9090/api/tasks/',
            responseType: 'json',
        });
        return function({ url, method, body, throwError = true }) {
            return instance[method](url, {
                json: body,
                throwHttpErrors: throwError
            });
        };
    },

    createOrderedArray(range) {
        return Array.from({length: range}, (_, i) => i + 1)
    },

    validateArray(arr, name, options) {
        const MAX_LENGTH = options.maxLength || MAX_INT;
        const MAX_VALUE = options.maxValue || MAX_INT;
        const MIN_VALUE = options.minValue || MIN_INT;

        const isDistinctArray = (arr) => {
            const distinct = {};
            return !arr.some(el => {
                if (distinct[el]) {
                    return true;
                }
                distinct[el] = true;
            })
        }

        if (!Array.isArray(arr)) {
            throw new ValidationError(`${name} is not an array`);
        } else if (arr.length === 0) {
            throw new ValidationError(`${name} array must not be empty`);
        } else if (arr.length >= MAX_LENGTH) {
            throw new ValidationError(`${name} array is too big. max=${MAX_LENGTH}`);
        } else if (arr.some(el => typeof el !== 'number')) {
            throw new ValidationError(`${name} array elements must be numbers`);
        } else if (arr.some(el => el < MIN_VALUE)) {
            throw new ValidationError(`${name} array elements must be greater than ${MIN_VALUE}`);
        } else if (arr.some(el => el > MAX_VALUE)) {
            throw new ValidationError(`${name} array elements must be less than ${MAX_VALUE}`);
        } else if (options.checkIntegers && arr.some(el => !Number.isInteger(el))) {
            throw new ValidationError(`${name} array elements must be integers`);
        } else if (options.checkDistinct && !isDistinctArray(arr)) {
            throw new ValidationError(`${name} array elements must be distinct`);
        }
    }
}
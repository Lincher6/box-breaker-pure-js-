const {MAX_INT, MIN_INT} = require ("../../lib/constants");

module.exports = {
    positive: [
        {
            name: 'Test 1 (121)',
            body: {
                input: 121
            },
            method: 'isTrue',
        },
        {
            name: 'Test 2 (-121)',
            body: {
                input: -121
            },
            method: 'isFalse',
        },
        {
            name: 'Test 3 (10)',
            body: {
                input: 10
            },
            method: 'isFalse',
        },
        {
            name: 'Test 4 (0)',
            body: {
                input: 0
            },
            method: 'isTrue',
        },
        {
            name: 'Test 5 (MAX_INT)',
            body: {
                input: MAX_INT
            },
            method: 'isFalse',
        },
        {
            name: 'Test 6 (MIN_INT)',
            body: {
                input: MIN_INT
            },
            method: 'isFalse',
        },
        {
            name: 'Test 7 (\'121\')',
            body: {
                input: '121'
            },
            method: 'isTrue',
        },
        {
            name: 'Test 8 (\'1234321\')',
            body: {
                input: 1234321
            },
            method: 'isTrue',
        },
    ],

    negative: [
        {
            name: '400 - string value is not a number',
            body: {
                input: '1a2'
            },
            method: 'equal',
            expected: 'string value is not a number'
        },
        {
            name: '400 - value is not a number',
            body: {
                input: true
            },
            method: 'equal',
            expected: 'value is not a number'
        },
        {
            name: '400 - value is not a number',
            body: {
                input: {}
            },
            method: 'equal',
            expected: 'value is not a number'
        },
        {
            name: '400 - value must be an integer',
            body: {
                input: 1.5
            },
            method: 'equal',
            expected: 'value must be an integer'
        },
        {
            name: '400 - value is out of range',
            body: {
                input: MAX_INT + 10
            },
            method: 'equal',
            expected: 'value is out of range'
        },
        {
            name: '400 - value is out of range',
            body: {
                input: MIN_INT - 10
            },
            method: 'equal',
            expected: 'value is out of range'
        },
    ]
}
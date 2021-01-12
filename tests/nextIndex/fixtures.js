const {MAX_INT, MIN_INT} = require("../../lib/constants");

module.exports = {
    positive: [
        {
            name: 'Test 1 ([1,3,5,6], 5)',
            body: {
                nums: [1,3,5,6],
                target: 5
            },
            method: 'equal',
            expected: 2
        },
        {
            name: 'Test 2 ([1,3,5,6], 2)',
            body: {
                nums: [1,3,5,6],
                target: 2
            },
            method: 'equal',
            expected: 1
        },
        {
            name: 'Test 3 ([1,3,5,6], 7)',
            body: {
                nums: [1,3,5,6],
                target: 7
            },
            method: 'equal',
            expected: 4
        },
        {
            name: 'Test 4 ([1,3,5,6], 0)',
            body: {
                nums: [1,3,5,6],
                target: 0
            },
            method: 'equal',
            expected: 0
        },
        {
            name: 'Test 5 ([1], 0)',
            body: {
                nums: [1],
                target: 0
            },
            method: 'equal',
            expected: 0
        },
        {
            name: 'Test 6 ([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 20)',
            body: {
                nums: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
                target: 20
            },
            method: 'equal',
            expected: 20
        },
        {
            name: 'Test 7 ([1, 2, 3], MAX_INT)',
            body: {
                nums: [1, 2, 3],
                target: MAX_INT
            },
            method: 'equal',
            expected: 3
        },
    ],

    negative: [
        {
            name: '400 - nums is not an array',
            body: {
                nums: '1, 2, 3',
                target: 0
            },
            method: 'equal',
            expected: 'nums is not an array'
        },
        {
            name: '400 - nums array elements must be numbers',
            body: {
                nums: [1, 'a', 2],
                target: 0
            },
            method: 'equal',
            expected: 'nums array elements must be numbers'
        },
        {
            name: '400 - nums array elements must be numbers',
            body: {
                nums: [1, 'a', 2],
                target: 0
            },
            method: 'equal',
            expected: 'nums array elements must be numbers'
        },
        {
            name: `400 - nums array elements must be less than ${MAX_INT}`,
            body: {
                nums: [MAX_INT + 1],
                target: 0
            },
            method: 'equal',
            expected: `nums array elements must be less than ${MAX_INT}`
        },
        {
            name: `400 - nums array elements must be greater than ${MIN_INT}`,
            body: {
                nums: [MIN_INT - 1],
                target: 0
            },
            method: 'equal',
            expected: `nums array elements must be greater than ${MIN_INT}`
        },
        {
            name: '400 - nums array elements must be distinct',
            body: {
                nums: [1, 1, 2],
                target: 0
            },
            method: 'equal',
            expected: 'nums array elements must be distinct'
        },
        {
            name: '400 - nums array elements must be integers',
            body: {
                nums: [1, 1.5, 2],
                target: 0
            },
            method: 'equal',
            expected: 'nums array elements must be integers'
        },
        {
            name: '400 - nums must be sorted',
            body: {
                nums: [1, 3, 2],
                target: 0
            },
            method: 'equal',
            expected: 'nums must be sorted'
        },
        {
            name: '400 - target must be a number',
            body: {
                nums: [1, 2, 3],
                target: '1'
            },
            method: 'equal',
            expected: 'target must be a number'
        },
        {
            name: `400 - target must be less than ${MAX_INT}`,
            body: {
                nums: [1, 2, 3],
                target: MAX_INT + 1
            },
            method: 'equal',
            expected: `target must be less than ${MAX_INT}`
        },
        {
            name: `400 - target must be more than ${MIN_INT}`,
            body: {
                nums: [1, 2, 3],
                target: MIN_INT - 1
            },
            method: 'equal',
            expected: `target must be more than ${MIN_INT}`
        },
        {
            name: `400 - target must be an integer`,
            body: {
                nums: [1, 2, 3],
                target: 1.5
            },
            method: 'equal',
            expected: `target must be an integer`
        },
    ]
}
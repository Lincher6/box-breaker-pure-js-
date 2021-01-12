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
            name: 'Test 1 ([1,3,5,6], 2)',
            body: {
                nums: [1,3,5,6],
                target: 2
            },
            method: 'equal',
            expected: 1
        },
        {
            name: 'Test 1 ([1,3,5,6], 7)',
            body: {
                nums: [1,3,5,6],
                target: 7
            },
            method: 'equal',
            expected: 4
        },
        {
            name: 'Test 1 ([1,3,5,6], 0)',
            body: {
                nums: [1,3,5,6],
                target: 0
            },
            method: 'equal',
            expected: 0
        },
        {
            name: 'Test 1 ([1], 0)',
            body: {
                nums: [1],
                target: 0
            },
            method: 'equal',
            expected: 0
        },
    ],

    negative: [
        {
            name: '400 - nums is not an Array',
            body: {
                nums: '1, 2, 3',
                target: 0
            },
            method: 'equal',
            expected: 'nums is not an Array'
        },
        {
            name: '400 - nums elements must be numbers',
            body: {
                nums: [1, 'a', 2],
                target: 0
            },
            method: 'equal',
            expected: 'nums elements must be numbers'
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
    ]
}
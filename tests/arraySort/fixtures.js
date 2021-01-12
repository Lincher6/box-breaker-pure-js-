const {createOrderedArray} = require("../../lib/utils");

module.exports = {
    positive: [
        {
            name: 'Test 1 ([2,3,1,3,2,4,6,7,9,2,19], [2,1,4,3,9,6])',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [2, 1, 4, 3, 9, 6]
            },
            method: 'deepEqual',
            expected: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19]
        },
        {
            name: 'Test 2 ([3,2,1,3,2,1], [2,1,3])',
            body: {
                arr1: [3, 2, 1, 3, 2, 1],
                arr2: [2, 1, 3]
            },
            method: 'deepEqual',
            expected: [2, 2, 1, 1, 3, 3]
        },
        {
            name: 'Test 3 ([1,2,3,4,5,6], [4])',
            body: {
                arr1: [1, 2, 3, 4, 5, 6],
                arr2: [4]
            },
            method: 'deepEqual',
            expected: [4, 1, 2, 3, 5, 6]
        },
        {
            name: 'Test 4 (createOrderedArray(999))',
            body: {
                arr1: createOrderedArray(999),
                arr2: createOrderedArray(999)
            },
            method: 'deepEqual',
            expected: createOrderedArray(999)
        },
        {
            name: 'Test 5 (createOrderedArray(999) reversed)',
            body: {
                arr1: createOrderedArray(999),
                arr2: createOrderedArray(999).reverse()
            },
            method: 'deepEqual',
            expected: createOrderedArray(999).reverse()
        },
        {
            name: 'Test 6 ([1], [1])',
            body: {
                arr1: [1],
                arr2: [1]
            },
            method: 'deepEqual',
            expected: [1]
        },
    ],

    negative: [
        {
            name: '400 - first is not an array',
            body: {
                arr1: '2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19',
                arr2: [2, 1, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'first is not an array'
        },
        {
            name: '400 - second is not an array',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: '2, 1, 4, 3, 9, 6'
            },
            method: 'equal',
            expected: 'second is not an array'
        },
        {
            name: '400 - first array must not be empty',
            body: {
                arr1: [],
                arr2: [2, 1, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'first array must not be empty'
        },
        {
            name: '400 - second array must not be empty',
            body: {
                arr1: [2, 1, 4, 3, 9, 6],
                arr2: []
            },
            method: 'equal',
            expected: 'second array must not be empty'
        },
        {
            name: '400 - first array is too big. max=1000',
            body: {
                arr1: Array.from({ length: 1100 }).fill(1),
                arr2: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19]
            },
            method: 'equal',
            expected: 'first array is too big. max=1000'
        },
        {
            name: '400 - second array is too big. max=1000',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: Array.from({ length: 1100 }).fill(1)
            },
            method: 'equal',
            expected: 'second array is too big. max=1000'
        },
        {
            name: '400 - first array elements must be greater than 1',
            body: {
                arr1: [-2, -3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [2, 1, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'first array elements must be greater than 1'
        },
        {
            name: '400 - second array elements must be greater than 1',
            body: {
                arr1: [2, 1, 4, 3, 9, 6],
                arr2: [-2, -3, 1, 3, 2, 4, 6, 7, 9, 2, 19]
            },
            method: 'equal',
            expected: 'second array elements must be greater than 1'
        },
        {
            name: '400 - first array elements must be integers',
            body: {
                arr1: [1, 1.5, 3.2],
                arr2: [1, 2, 3]
            },
            method: 'equal',
            expected: 'first array elements must be integers'
        },
        {
            name: '400 - second array elements must be integers',
            body: {
                arr1: [1, 2, 3],
                arr2: [1, 1.5, 3.2]
            },
            method: 'equal',
            expected: 'second array elements must be integers'
        },
        {
            name: '400 - second array elements must be less than 1000',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [2000, 1100, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'second array elements must be less than 1000'
        },
        {
            name: '400 - second array elements must be distinct',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [1, 1, 2, 3]
            },
            method: 'equal',
            expected: 'second array elements must be distinct'
        },
        {
            name: '400 - all second array elements must be in first array',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [5, 2, 1, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'all second array elements must be in first array'
        },
    ]
}
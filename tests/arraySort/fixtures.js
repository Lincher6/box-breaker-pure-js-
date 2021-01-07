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
            name: 'Test 1 ([3,2,1,3,2,1], [2,1,3])',
            body: {
                arr1: [3, 2, 1, 3, 2, 1],
                arr2: [2, 1, 3]
            },
            method: 'deepEqual',
            expected: [2, 2, 1, 1, 3, 3]
        },
        {
            name: 'Test 1 ([1,2,3,4,5,6], [4])',
            body: {
                arr1: [1, 2, 3, 4, 5, 6],
                arr2: [4]
            },
            method: 'deepEqual',
            expected: [4, 1, 2, 3, 5, 6]
        },
    ],

    negative: [
        {
            name: '400 - first argument is not an array',
            body: {
                arr1: '2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19',
                arr2: [2, 1, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'first argument is not an array'
        },
        {
            name: '400 - second argument is not an array',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: '2, 1, 4, 3, 9, 6'
            },
            method: 'equal',
            expected: 'second argument is not an array'
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
            name: '400 - second array is too big. max=1000',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: Array.from({ length: 1100 }).fill(1)
            },
            method: 'equal',
            expected: 'second array is too big. max=1000'
        },
        {
            name: '400 - first array elements must be positive numbers',
            body: {
                arr1: [-2, -3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [2, 1, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'first array elements must be positive numbers'
        },
        {
            name: '400 - second array elements must be numbers less than 1000',
            body: {
                arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
                arr2: [2000, 1100, 4, 3, 9, 6]
            },
            method: 'equal',
            expected: 'second array elements must be numbers less than 1000'
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
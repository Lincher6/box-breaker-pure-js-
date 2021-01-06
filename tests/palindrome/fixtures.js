module.exports = [
    {
        name: 'Test 1 (121)',
        body: {
            input: 121
        },
        method: 'equal',
        expected: true
    },
    {
        name: 'Test 2 (-121)',
        body: {
            input: -121
        },
        method: 'equal',
        expected: false
    },
    {
        name: 'Test 3 (10)',
        body: {
            input: 10
        },
        method: 'equal',
        expected: false
    },
    {
        name: 'Test 4 (0)',
        body: {
            input: 0
        },
        method: 'equal',
        expected: true
    },
    {
        name: '400 - value is not a number',
        body: {
            input: '123'
        },
        method: 'equal',
        expected: 'value is not a number'
    }
]
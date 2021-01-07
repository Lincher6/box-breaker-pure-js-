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
        }
    ],

    negative: [
        {
            name: '400 - value is not a number',
            body: {
                input: '123'
            },
            method: 'equal',
            expected: 'value is not a number'
        }
    ]
}
module.exports = {
    positive: [
        {
            name: 'Test 1 (\'()\')',
            body: {
                input: '()'
            },
            method: 'isTrue',
        },
        {
            name: 'Test 1 (\'()[]{}\')',
            body: {
                input: '()[]{}'
            },
            method: 'isTrue',
        },
        {
            name: 'Test 1 (\'(]\')',
            body: {
                input: '(]'
            },
            method: 'isFalse',
        },
        {
            name: 'Test 1 (\'([)]\')',
            body: {
                input: '([)]'
            },
            method: 'isFalse',
        },
        {
            name: 'Test 1 (\'{[]}\')',
            body: {
                input: '{[]}'
            },
            method: 'isTrue',
        }
    ],

    negative: [
        {
            name: '400 - value is not a string',
            body: {
                input: 123
            },
            method: 'equal',
            expected: 'value is not a string'
        },
        {
            name: '400 - string is too long',
            body: {
                input: 'I'.repeat(110)
            },
            method: 'equal',
            expected: 'string is too long'
        },
        {
            name: '400 - value is empty',
            body: {
                input: ''
            },
            method: 'equal',
            expected: 'value is empty'
        },
        {
            name: '400 - invalid characters',
            body: {
                input: '(123)'
            },
            method: 'equal',
            expected: 'invalid characters'
        },
    ]
}
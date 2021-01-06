module.exports = [
    {
        name: 'Test 1 (\'III\')',
        body: {
            input: 'III'
        },
        method: 'equal',
        expected: 3
    },
    {
        name: 'Test 2 (\'IV\')',
        body: {
            input: 'IV'
        },
        method: 'equal',
        expected: 4
    },
    {
        name: 'Test 3 (\'IX\')',
        body: {
            input: 'IX'
        },
        method: 'equal',
        expected: 9
    },
    {
        name: 'Test 4 (\'LVIII\')',
        body: {
            input: 'LVIII'
        },
        method: 'equal',
        expected: 58
    },
    {
        name: 'Test 5 (\'MCMXCIV\')',
        body: {
            input: 'MCMXCIV'
        },
        method: 'equal',
        expected: 1994
    },
    {
        name: '400 - input is not a string',
        body: {
            input: 123
        },
        method: 'equal',
        expected: 'input is not a string'
    },
    {
        name: '400 - roman number is too big',
        body: {
            input: 'I'.repeat(20)
        },
        method: 'equal',
        expected: 'roman number is too big'
    },
    {
        name: '400 - input is empty',
        body: {
            input: ''
        },
        method: 'equal',
        expected: 'input is empty'
    },
    {
        name: '400 - not a roman number',
        body: {
            input: 'IIadbcII'
        },
        method: 'equal',
        expected: 'not a roman number'
    },
]
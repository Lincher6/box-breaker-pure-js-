
module.exports = [
    {
        name: '500 - invalid body type',
        body: undefined,
        method: 'equal',
        expected: 'body is not a JSON'
    },
    {
        name: '500 - invalid JSON type',
        body: 'string',
        method: 'equal',
        expected: 'JSON is not an object'
    }
]
const { assert } = require('chai');
const { getGot } = require('../../lib/utils');
const { positive, negative } = require('./fixtures');
const { positiveCommon, negativeCommon } = require('../fixturesCommon');

const got = getGot();

describe('Testing task 5 - nextIndex. (Positive)', () => {
    const cases = [...positive, ...positiveCommon];

    cases.forEach(({ name, body, method, expected }) => {
        it(name, async () => {
            const { body: { result } } = await got({ url: '/nextIndex', method: 'post', body });
            assert[method](result, expected);
        })
    })
})

describe('Testing task 5 - nextIndex. (Negative)', () => {
    const cases = [...negative, ...negativeCommon];

    cases.forEach(({ name, body, method, expected }) => {
        it(name, async () => {
            const { body: { message } } = await got({ url: '/nextIndex', method: 'post', body, throwError: false });
            assert[method](message, expected);
        })
    })
})
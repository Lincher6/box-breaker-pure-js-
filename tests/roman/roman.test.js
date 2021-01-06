const { assert } = require('chai');
const { gotCall } = require('../../lib/utils');
const fixtures = require('./fixtures');
const fixturesCommon = require('../fixturesCommon')

describe('Testing task 1 - roman', () => {
    const cases = [...fixtures, ...fixturesCommon];

    cases.forEach(({ name, body, method, expected }) => {
        it(name, async () => {
            try {
                const { body: { result } } = await gotCall({ url: '/roman', method: 'post', body });
                assert[method](result, expected);
            } catch (e) {
                const { message } = e.response.body;
                assert[method](message, expected);
            }
        })
    })
})
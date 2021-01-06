const {Router} = require('express');
const roman = require('../tasks/roman')
const palindrome = require('../tasks/palindrome')
const brackets = require('../tasks/brackets')
const arraySort = require('../tasks/arraySort')
const nextIndex = require('../tasks/nextIndex')
const { callWithResponse, jsonParser } = require('../lib/utils')
const router = Router();

router.post('/roman', jsonParser, (req, res) => {
    const { input } = req.body;
    callWithResponse({ res, fn: roman, params: [input]  })
});

router.post('/palindrome', jsonParser, (req, res) => {
    const { input } = req.body;
    callWithResponse({ res, fn: palindrome, params: [input]  })
});

router.post('/brackets', jsonParser, (req, res) => {
    const { input } = req.body;
    callWithResponse({ res, fn: brackets, params: [input]  })
});

router.post('/arraySort', jsonParser, (req, res) => {
    const { arr1, arr2 } = req.body;
    callWithResponse({ res, fn: arraySort, params: [arr1, arr2] })
});

router.post('/nextIndex', jsonParser, (req, res) => {
    const { nums, target } = req.body;
    callWithResponse({ res, fn: nextIndex, params: [nums, target]  })
});

module.exports = router;
const {Router} = require('express');
const path = require('path');
const { jsonParser } = require('../lib/utils');
const fs = require('fs');

const router = Router();

router.get('/results', (req, res) => {
    const rawJson = fs.readFileSync(path.join(__dirname, '../results.json'));
    const { results } = JSON.parse(rawJson);
    try {
        res.json({ results: results.slice(0, 10) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/results', jsonParser, (req, res) => {
    const sortedResults = req.body.results.sort((a, b) => b.score - a.score);

    fs.writeFile(path.join(__dirname, '../results.json'), JSON.stringify({ results: sortedResults}), (err) => {
        if (err) {
            res.status(400).send('Result is not saved');
            return;
        }
        res.send('Result is saved');
    })
});

module.exports = router;
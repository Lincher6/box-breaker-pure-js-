const {protectedRoute} = require("../lib/middlewares");
const {sortResults} = require("../lib/utils");
const {Router} = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();

router.get('/', (req, res) => {
    if (req.cookies.user) {
        return res.redirect('/game');
    } else {
        return res.redirect('/login');
    }
})

router.get('/game', protectedRoute, (req, res) => {
    res.sendFile(path.join(__dirname, '../static/game/game.html'));
})

router.get('/results', protectedRoute, (req, res) => {
    const rawJson = fs.readFileSync(path.join(__dirname, '../results.json'));
    const { results } = JSON.parse(rawJson);
    const { username } = JSON.parse(req.cookies.user);

    const userResult = results.reduce((acc, result) => {
        if (result.name === username) {
            acc = result.score > acc ? result.score : acc;
        }
        return acc;
    }, 0)

    try {
        res.json({
            results: sortResults(results).slice(0, 10),
            userResult
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/results', protectedRoute, (req, res) => {
    const rawJson = fs.readFileSync(path.join(__dirname, '../results.json'));
    const { results } = JSON.parse(rawJson);
    const { name, score } = req.body;
    results.push({name, score});

    fs.writeFile(path.join(__dirname, '../results.json'), JSON.stringify({ results }), (err) => {
        if (err) {
            return res.status(400).send('Result is not saved');

        }
        res.send('Result is saved');
    })
});

module.exports = router;
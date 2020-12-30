const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { results } = require('./results.json');

const app = express();
const port = process.env.PORT || 3000;
app.use(serveStatic('static'));
app.use(bodyParser.json());

app.get('/results', (req, res) => {
    try {
        res.json({ results: results.slice(0, 10) });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

app.post('/results', (req, res) => {
    const sortedResults = req.body.results.sort((a, b) => b.score - a.score);

    fs.writeFile('./results.json', JSON.stringify({ results: sortedResults}), (err) => {
        if (err) {
            res.status(400).send('Result is not saved');
            return;
        }
        res.send('Result is saved');
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/404.html'));
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
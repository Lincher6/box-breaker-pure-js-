require('dotenv').config();
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
const port = process.env.PORT || 9090;
app.use(serveStatic('static'));

app.use('/api/tasks', require('./routes/tasks'));
app.use('/', require('./routes/game'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/404.html'));
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
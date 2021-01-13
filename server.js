require('dotenv').config();
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 9090;

app.use('/api/tasks', require('./routes/tasks'));

app.use(serveStatic('static'));
app.use(cookieParser());
app.use(express.json());
app.use('/', require('./routes/game'));
app.use('/', require('./routes/auth'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/404/404.html'));
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
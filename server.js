require('dotenv').config();
const config = require('./config');
const express = require('express');
const serveStatic = require('serve-static');
const { mongooseErrorHandler } = require('./lib/middlewares');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = process.env.PORT || config.PORT;

async function start() {
    await mongoose.connect(config.DB_URL, config.mongoose_options);
    app.set('trust proxy', true);
    app.use(session(config.session_options));

    app.use('/api/tasks', require('./routes/tasks'));

    app.set('view engine', 'ejs');
    app.use(serveStatic('public'));
    app.use(cookieParser());
    app.use(express.json());
    app.use('/', require('./routes/game'),require('./routes/auth'));

    app.get('*', (req, res) => {
        res.render('404');
    })

    app.use(mongooseErrorHandler);

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    })
}

start();


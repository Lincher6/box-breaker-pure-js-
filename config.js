const { DATE_DAY } = require('./lib/constants');

module.exports = {
    PORT: 9090,
    DB_URL: 'mongodb+srv://IceBerg:op0987654321mongo@cluster0.wp9kl.mongodb.net/box-breaker?retryWrites=true&w=majority',
    mongoose_options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    session_options: {
        secret: 'secret string',
        unset: 'keep',
        cookie: { maxAge: DATE_DAY },
        resave: false,
        saveUninitialized: true,
    }
}
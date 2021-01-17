const { authRoute } = require("../lib/middlewares");
const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.get('/login', authRoute, (req, res) => {
    res.render('login');
})

router.post('/login', UserController.login);

router.post('/logout', (req, res) => {
    res.clearCookie('user').redirect('/');
})

router.get('/registration', authRoute, (req, res) => {
    res.render('registration');
})

router.post('/registration', UserController.createUser);

module.exports = router;
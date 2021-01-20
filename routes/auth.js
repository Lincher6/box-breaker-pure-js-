const { authRoute, adminRoute } = require('../lib/middlewares');
const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router.get('/login', authRoute, (req, res) => {
    res.render('login');
})

router.post('/login', UserController.login);

router.post('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
})

router.get('/registration', authRoute, (req, res) => {
    res.render('registration');
})

router.post('/registration', UserController.createUser);

router.get('/admin', adminRoute, (req, res) => {
    res.render('admin', { user: req.session.user });
})

module.exports = router;
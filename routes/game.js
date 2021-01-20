const { protectedRoute, adminRoute } = require('../lib/middlewares');
const ResultsController = require('../controllers/results.controller');
const UsersController = require('../controllers/user.controller');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/game');
    } else {
        return res.redirect('/login');
    }
})

router.get('/game', protectedRoute, (req, res) => {
    res.render('game', { user: req.session.user });
})

router.get('/results', protectedRoute, ResultsController.getResults);

router.post('/results', protectedRoute, ResultsController.saveResult);

router.get('/users', adminRoute, UsersController.getUsers);
router.post('/users', adminRoute, UsersController.updateUser);

module.exports = router;
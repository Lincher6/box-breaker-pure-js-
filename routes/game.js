const { protectedRoute } = require("../lib/middlewares");
const ResultsController = require("../controllers/results.controller")
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    if (req.cookies.user) {
        return res.redirect('/game');
    } else {
        return res.redirect('/login');
    }
})

router.get('/game', protectedRoute, (req, res) => {
    res.render('game');
})

router.get('/results', protectedRoute, ResultsController.getResults);

router.post('/results', protectedRoute, ResultsController.saveResult);

module.exports = router;
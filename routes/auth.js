const {authRoute} = require("../lib/middlewares");
const {DATE_DAY} = require("../lib/constants");
const {Router} = require('express');
const path = require('path');
const fs = require('fs');

const router = Router();

router.get('/login', authRoute, (req, res) => {
    res.sendFile(path.join(__dirname, '../static/login/login.html'));
})

router.post('/login', (req, res) => {
    const rawJson = fs.readFileSync(path.join(__dirname, '../users.json'));
    const { users } = JSON.parse(rawJson);
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (user) {
        if (user.password === password) {
            res.cookie(
                'user',
                JSON.stringify({username, password}),
                {expires: new Date(Date.now() + DATE_DAY)}
            )
            res.redirect('/game');
        } else {
            res.status(400).json({ message: 'wrong password' });
        }
    } else {
        res.status(400).json({ message: 'no user found' });
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('user').redirect('/');
})

router.get('/registration', authRoute, (req, res) => {
    res.sendFile(path.join(__dirname, '../static/registration/registration.html'))
})

router.post('/registration', (req, res) => {
    const rawJson = fs.readFileSync(path.join(__dirname, '../users.json'));
    const { users } = JSON.parse(rawJson);
    const { username, password } = req.body;
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'already exists' });
    }
    users.push({ username, password });

    fs.writeFile(path.join(__dirname, '../users.json'), JSON.stringify({ users }), (err) => {
        if (err) {
            return res.status(400).send('User is not saved');
        }
        res.cookie('user', JSON.stringify({username, password}), {expires: new Date(Date.now() + DATE_DAY)})
        res.redirect('/game');
    })
})

module.exports = router;
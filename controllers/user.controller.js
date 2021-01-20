const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

exports.login = async function (req, res, next) {
    try {
        const { body } = req;
        const user = await UserService.getUser({ login: body.login.trim() });
        if (user) {
            if (bcrypt.compareSync(body.password, user.password)) {
                req.session.user = user;
                return res.redirect('/game');
            }
            return res.status(400).json({ message: 'Неверный пароль.' });
        }
        return res.status(404).json({ message: 'Пользователь не найден.' });
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async function (req, res, next) {
    try {
        const users = await UserService.getUsers(req.query);
        const totalUserCount = await UserService.getTotalUserCount(req.query.searchString);
        return res.status(200).json({ users, totalUserCount })
    } catch (error) {
        next(error);
    }
}

exports.createUser = async function(req, res, next) {
    try {
        const { body, ip } = req;
        const user = await UserService.createUser({ ...body, userIp: ip });
        req.session.user = user;
        return res.redirect('/game');
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async function({ body }, res, next) {
    try {
        await UserService.updateUser({ login: body.login }, { [body.key]: body.value });
        return res.status(200).json({ message: 'role changed' });
    } catch (error) {
        next(error);
    }
}
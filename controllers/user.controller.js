const UserService = require('../services/user.service');
const { DATE_DAY } = require("../lib/constants");
const bcrypt = require('bcrypt');

exports.login = async function ({ body }, res, next) {
    try {
        const user = await UserService.getUser(body.login.trim());
        if (user) {
            if (bcrypt.compareSync(body.password, user.password)) {
                res.cookie('user', { id: user._id, name: user.name }, { maxAge: DATE_DAY });
                return res.redirect('/game');
            }
            return res.status(400).json({ message: 'Неверный пароль.' });
        }
        return res.status(404).json({ message: 'Пользователь не найден.' });
    } catch (error) {
        next(error);
    }
}

exports.createUser = async function({ body, ip }, res, next) {
    try {
        const user = await UserService.createUser({ ...body, ip });
        res.cookie('user', { id: user._id, name: user.name }, { maxAge: DATE_DAY });
        return res.redirect('/game');
    } catch (error) {
        next(error);
    }


}
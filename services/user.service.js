const User = require('../models/user.model');

exports.getUser = async function (query) {
    return await User.findOne({login: query});
}

exports.createUser = async function (body) {
    const user = new User(body);
    return await user.save();
}
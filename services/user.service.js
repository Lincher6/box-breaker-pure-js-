const User = require('../models/user.model');

exports.getUser = async function (query) {
    return await User.findOne(query);
}
exports.getUsers = function ({ pageSize = 10, page = 1, searchString = '', sortType = 'hiScore', sortValue = 1 }) {
    const regex = new RegExp(searchString);
    return User.find({ $or: [{ login: regex }, { name: regex }, { userIp: regex } ] })
        .sort({ [sortType]: sortValue })
        .skip(pageSize * (page - 1))
        .limit(+pageSize);
}

exports.getTotalUserCount = function (searchString = '') {
    return User.countDocuments({ name: RegExp(searchString) });
}

exports.createUser = async function (body) {
    const user = new User(body);
    return await user.save();
}

exports.updateUser = function (filter, value) {
    return User.findOneAndUpdate(filter, value);
}
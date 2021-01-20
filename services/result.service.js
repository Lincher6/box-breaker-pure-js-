const Result = require('../models/result.model');

exports.getUserResults = async function (name) {
    return await Result.find({ name });
}

exports.getResults = async function () {
    return await Result.find().sort([['score', -1]]).limit(10);
}

exports.saveResult = async function (body) {
    const result = new Result(body);
    return await result.save();
}
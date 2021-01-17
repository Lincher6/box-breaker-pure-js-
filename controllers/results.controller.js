const ResultServices = require('../services/result.service');

exports.getResults = async function (req, res, next) {
    try {
        const { name } = req.cookies.user;
        const topResults = await ResultServices.getResults();
        const userResults = await ResultServices.getUserResults(name);
        const userTopResult = userResults.reduce((max, result) => {
            max = max > result.score ? max : result.score;
            return max;
        }, 0)
        res.status(200).json({ topResults, userResult: { name, hiScore: userTopResult } });
    } catch (error) {
        next(error);
    }
}

exports.saveResult = async function (req, res, next) {
    try {
        await ResultServices.saveResult(req.body);
        const topResults = await ResultServices.getResults();
        return res.status(200).json({ topResults });
    } catch (error) {
        next(error);
    }
}
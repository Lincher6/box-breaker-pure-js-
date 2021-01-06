const got = require('got');

module.exports = {
    callWithResponse({ fn, res, params }) {
        try {
            const result = fn(...params);
            res.status(200).json({ result });
        } catch (e) {
            if (e.name === 'ValidationError') {
                res.status(400).json({ message: e.message });
            } else {
                res.status(500).json({ message: e.message });
            }
        }
    },

    jsonParser(req, res, next){
        let data = "";
        req.on('data', function(chunk){ data += chunk})
        req.on('end', function(){
            req.rawBody = data;
            try {
                req.body = JSON.parse(data);
                if (typeof req.body !== 'object') {
                    return res.status(400).json({ message: 'JSON is not an object' });
                }
            } catch (e) {
                return res.status(400).json({ message: 'body is not a JSON' });
            }
            next();
        })
    },

    gotCall({ url, method, body }) {
        const BASE_URL = 'http://localhost:9090/api/tasks';
        return got[method](`${BASE_URL}${url}`, {
            json: body,
            responseType: 'json'
        })
    }


}
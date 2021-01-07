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

    getGot() {
        const instance = got.extend({
            prefixUrl: 'http://localhost:9090/api/tasks',
            responseType: 'json',
        })
        return function({ url, method, body, throwError = true }) {
            return instance[method](url, {
                json: body,
                throwHttpErrors: throwError
            })
        }
    }


}
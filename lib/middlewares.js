
module.exports = {
    jsonParser(req, res, next){
        let data = "";
        req.on('data', function(chunk){ data += chunk});
        req.on('end', function(){
            req.rawBody = data;
            try {
                req.body = JSON.parse(data);
                if (typeof req.body !== 'object') {
                    return res.status(500).json({ message: 'JSON is not an object' });
                }
            } catch (e) {
                return res.status(500).json({ message: 'body is not a JSON' });
            }
            next();
        });
    },

    protectedRoute(req, res, next) {
        if (!req.cookies.user) {
            return res.redirect('/');
        }
        return next();
    },

    authRoute(req, res, next) {
        if (req.cookies.user) {
            return res.redirect('/game');
        }
        return next();
    }
}
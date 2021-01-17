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
    },

    mongooseErrorHandler(error, req, res, next) {
        try {
            if(error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors)[0].message;
                return res.status(400).json({ message: errorMessage });
            }
            if(error.code && error.code === 11000) {
                return res.status(400).json({ message: 'Пользователь уже существует.' });
            }
        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }
}
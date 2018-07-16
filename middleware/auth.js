const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    // console.log(token);
    if(!token) return res.status(401).send('Access denied. Auth token not provided!');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        // console.log(req.user._id);
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token. ')
    }
}

module.exports = auth;
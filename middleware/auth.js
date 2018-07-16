const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. Auth token not provided!');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // console.log(decoded);
        if(decoded){
            req.user = decoded;
            next();
        }
        else res.status(400).send('Invalid token. ')
    }
    catch(ex){
        res.status(400).send('Invalid token!')
    }
}

module.exports = auth;
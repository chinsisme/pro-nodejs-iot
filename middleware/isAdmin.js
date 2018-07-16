const jwt = require('jsonwebtoken');
const config = require('config');

function isAdmin(req, res, next) {
    // console.log(req.user.isAdmin);
    if(!req.user.isAdmin) return res.status(403).send('Not an admin user. Access denied.')
    else next();
}

module.exports = isAdmin;
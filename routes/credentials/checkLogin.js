const User = require('./../../models/users');
const bcrypt = require('bcrypt');

module.exports = async function checkLogin(info){
    try{
        let user = await User.findOne({ username: info.username});
        if(user) {
            return await bcrypt.compare(info.password, user.password);
        }
    }
    catch(err){
        console.log(err);
    }
}
const User = require('./../../models/users');

module.exports = async function checkIfUserExists(info){
    try{
        let result = await User.findOne({ username: info.username, email: info.email});
        return result;
    }
    catch(err){
        console.log(err);
    }
}
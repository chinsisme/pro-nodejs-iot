const User = require('./../../models/users');

module.exports = async function checkIfExists(info){
    try{
        let result = await User.findOne({ username: info.username, password: info.password});
        return result;
    }
    catch(err){
        console.log(err);
    }
}
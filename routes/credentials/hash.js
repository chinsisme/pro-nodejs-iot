const bcrypt = require('bcrypt');

module.exports = async function hashFunction(password,saltGenRounds){
    const salt = await bcrypt.genSalt(saltGenRounds);
    password = await bcrypt.hash(password, salt);
    return password;
}
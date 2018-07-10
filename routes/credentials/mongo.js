const mongo_credentials = {
    username: String,
    password: String,
    host: String,
    database: String,
    port: String
};

mongo_credentials.username = 'app_user';
mongo_credentials.password = 'mypassword';
mongo_credentials.host = 'localhost';
mongo_credentials.database = 'iot';
mongo_credentials.port = '27017';

module.exports = mongo_credentials;

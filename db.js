var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost/tgr2019test';
var collections = ['users'];
var option = {"auth":{"user":"tgr","password":"2019"}};
var connect = mongojs(databaseUrl, collections,option);
module.exports = {
    connect: connect
};
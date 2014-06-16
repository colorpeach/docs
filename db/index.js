var MongoClient = require('mongodb').MongoClient,
//     url = 'mongodb://127.0.0.1:27017/docs';
    url = 'mongodb://colorpeach:ll0427##@ds033699.mongolab.com:33699/docs';

module.exports = {
    connect:function(callback){
        MongoClient.connect(url,callback);
    },
    url:url
};
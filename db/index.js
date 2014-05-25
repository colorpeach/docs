var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://colorpeach:ll0427##@ds033699.mongolab.com:33699/docs';

module.exports = {
    connect:function(callback){
        MongoClient.connect(url,callback);
    },
    url:url
};
var MongoClient = require('mongodb').MongoClient,
//     url = 'mongodb://127.0.0.1:27017/docs';
    url = process.env.MONGODB;

module.exports = {
    connect:function(callback){
        MongoClient.connect(url,callback);
    },
    url:url
};
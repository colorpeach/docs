var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB || 'mongodb://127.0.0.1:27017/docs';

// module.exports = {
//     connect:function(c,fn){
//         var self = this;
//         if(self.db){
//             var c = db.collection(c);
//             fn(c);
//         }else{
//             MongoClient.connect(url,function(err,db){
//                 if(err) throw err;
                
//                 var c = db.collection(c);
//                 self.db = db;
//                 fn(c);
//             });
//         }
//     },
//     close:function(){
//         self.db && self.db.close();
//     }
//     url:url
// };

module.exports = {
    connect:function(callback){
        MongoClient.connect(url,callback);
    },
    url:url
};
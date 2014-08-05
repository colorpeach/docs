var dbClient = require('../db');
var tidy = dbClient.column({
    login:'login',
    url:'url',
    stream:'stream',
    type:'type'
});
var photo = {};

//保存图片
//photo.save = function(data,fn){
//    var d = tidy(data);
//    dbClient.connect([
//        function(db,callback){
//            db.collection('photo').insert(d,function(err,data){
//                callback(err,data);
//            });
//        }
//    ],fn);
//}

//查询图片
photo.query = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('photo').find(d,{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//更新图片
photo.update = function(data,fn){
    var d = dbClient.split(tidy(data),['user']);
    dbClient.connect([
        function(db,callback){
            db.collection('photo').update(d.search,{$set:d.data},{upsert:true},function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports = photo;
var dbClient = require('../db');
var tidy = dbClient.column({
    title:'title',
    content:'content',
    user:'user',
    auth:'auth'
});
var doc = {};

//新增文档
doc.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('docs').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//更新文档
doc.update = function(data,fn){
    var d = dbClient.split(tidy(data));
    dbClient.connect([
        function(db,callback){
            db.collection('docs').update(d.search,{$set:d.data},function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除文档
doc.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('docs').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询文档
doc.query = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('docs').find(d,{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports =  doc;
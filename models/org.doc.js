var dbClient = require('../db');
var ObjectID = require('mongodb').ObjectID;
var tidy = dbClient.column({
    doc:'doc',
    org:'org'
});
var orgDoc = {};

//查询
orgDoc.query = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.doc').find(d,{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//添加组织与文档关联
orgDoc.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.doc').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除组织与文档的关联
orgDoc.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.doc').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询与文档相关的组织
orgDoc.queryOrgs = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.doc').find(d).toArray(function(err,data){
                callback(err,data,db);
            });
        },
        function(list,db,callback){
            var d = list.map(function(n){return new ObjectID(n.org);});
            db.collection('org').find({_id:{$in:d}},{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询与组织相关的文档
orgDoc.queryDocs = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.doc').find(d).toArray(function(err,data){
                callback(err,data,db);
            });
        },
        function(list,db,callback){
            var d = list.map(function(n){return new ObjectID(n.doc);});
            db.collection('doc').find({_id:{$in:d}},{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports = orgDoc;
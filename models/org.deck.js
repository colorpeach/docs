var dbClient = require('../db');
var ObjectID = require('mongodb').ObjectID;
var tidy = dbClient.column({
    doc:'deck',
    org:'org'
});
var orgDeck = {};

//查询
orgDeck.query = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.deck').find(d,{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//添加组织与幻灯片关联
orgDeck.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.deck').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除组织与幻灯片的关联
orgDeck.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.deck').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询与幻灯片相关的组织
orgDeck.queryOrgs = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.deck').find(d).toArray(function(err,data){
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

//查询与组织相关的幻灯片
orgDeck.queryDecks = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.deck').find(d).toArray(function(err,data){
                callback(err,data,db);
            });
        },
        function(list,db,callback){
            var d = list.map(function(n){return new ObjectID(n.doc);});
            db.collection('deck').find({_id:{$in:d}},{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports = orgDeck;

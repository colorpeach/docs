var dbClient = require('../db');
var ObjectID = require('mongodb').ObjectID;
var tidy = dbClient.column({
    user:'user',
    org:'org'
});
var orgUser = {};

//查询
orgUser.query = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.user').find(d).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//向组织添加用户
orgUser.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.user').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除用户
orgUser.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.user').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//获取组织用户
orgUser.queryUsers = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.user').find(d).toArray(function(err,data){
                callback(err,data,db);
            });
        },
        function(list,db,callback){
            var d = list.map(function(n){return n.user;});
            db.collection('user').find({login:{$in:d}}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//获取用户组织
orgUser.queryOrgs = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org.user').find(d).toArray(function(err,data){
                callback(err,data,db);
            });
        },
        function(list,db,callback){
            var d = list.map(function(n){return new ObjectID(n.org);});
            db.collection('org').find({_id:{$in:d}}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports = orgUser;
var dbClient = require('../db');
var tidy = dbClient.column({
    owner:'owner',
    name:'name',
    password:'password',
    code:'code'
});
var org = {};

//新增组织
org.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org').find().sort({code:-1}).limit(1).toArray(function(err,list){
                if(list && list.length){
                    d.code = list[0].code+1;
                }else{
                    d.code = 10000000;
                }
                callback(err,d,db);
            });
        },
        function(d,db,callback){
            db.collection('org').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//更新组织
org.update = function(data,fn){
    var d = dbClient.split(tidy(data));
    dbClient.connect([
        function(db,callback){
            db.collection('org').update(d.search,{$set:d.data},function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除组织
org.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询组织
org.query = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('org').find(d).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports = org;
var dbClient = require('../db');
var tidy = dbClient.column({
    name:'name',
    user:'user',
    description:'description',
    list:"list"
});

var Mock = {};

//新增mock规则
Mock.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//更新mock规则
Mock.update = function(data,fn){
    var d = dbClient.split(tidy(data));
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').update(d.search,{$set:d.data},function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除mock规则
Mock.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询mock规则
Mock.query = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').find(d,{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports = Mock;
var dbClient = require('../db');
var tidy = dbClient.column({
    title:'title',
    content:'content',
    user:'user',
    auth:'auth',
    thumbnail:'thumbnail'
});
var deck = {};

//新增幻灯片
deck.add = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('decks').insert(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//更新幻灯片
deck.update = function(data,fn){
    var d = dbClient.split(tidy(data));
    dbClient.connect([
        function(db,callback){
            db.collection('decks').update(d.search,{$set:d.data},function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除幻灯片
deck.del = function(data,fn){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('decks').remove(d,function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//查询幻灯片
deck.query = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('decks').find(d,{fields:filter}).toArray(function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

module.exports =  deck;

var dbClient = require('../db');
var tidy = dbClient.column({
    name:'name',
    user:'user',
    description:'description',
    list:"list"
});
var subTidy = dbClient.column({
    id:'id',
    name:'name',
    method:'method',
    description:'description',
    url:'url',
    request:'request',
    response:'response'
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

//新增接口文档
Mock.addItem = function(data,fn){
    var parentId = data.parentId;
    var d = dbClient.split(tidy(data));
    d.data.parentId = parentId;
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').find(d.search).toArray(function(err,data){
                var list = data[0].list;
                var id = 1;
                
                if(list && list.length){
                    id = (list[list.length - 1].id || 0) + 1;
                }
                
                callback(err,id,db);
            });
        },
        function(id,db,callback){
            d.data.id = id;
            db.collection('mocks').update(d.search,{$push:{'list':d.data}},function(err,data){
                callback(err,{id:id});
            });
        }
    ],fn);
}

//更新接口文档
Mock.updateItem = function(data,fn){
    var list = subTidy(data);
    var d = dbClient.split(tidy(data));
    d.search['list.id'] = data.id;

    delete list._id;

    dbClient.connect([
        function(db,callback){
            db.collection('mocks').update(d.search,{$set:{'list.$':list}},function(err,data){
                callback(err,data);
            });
        }
    ],fn);
}

//删除接口文档
Mock.deleteItem = function(data,fn){
    data.list = {
        $or:[
            {id:data.id},
            {parentId:data.id}
        ]
    };
    var d = dbClient.split(tidy(data));
    
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').update(d.search,{$pull:d.data},function(err,data){
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
};

//查询接口文档
Mock.queryItem = function(data,fn,filter){
    var d = tidy(data);
    dbClient.connect([
        function(db,callback){
            db.collection('mocks').aggregate(
                {'$match':d},
                {'$project':{'list':'$list'}},
                {'$unwind':'$list'},
                {'$match':data.search},
                function(err,data){
                    callback(err,data);
                }
            );
        }
    ],fn);
};

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
};

module.exports = Mock;
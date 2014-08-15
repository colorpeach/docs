var Mock = {};
var mockjs = require("mockjs");
var mock = require('../models/mock.js');
var baseRes = require('./baseResponse');

Mock.get_user_mocks = function(req,res){
    var user = req.session.user.login;
    mock.query({user:user},function(list){
        res.end(baseRes({mocks:list}));
    },{list:0});
};

Mock.post_add_mock = function(req,res){
    req.body.user = req.session.user.login;
    mock.add(req.body,function(data){
        res.end(baseRes({mock:data[0]}));
    });
};

Mock.post_del_mock = function(req,res){
    mock.del(req.body,function(data){
        res.end(baseRes(data));
    });
};

Mock.get_mock_item = function(req,res){
    var data = req.query;

    data.search = {
        'list.id':+data.id
    };

    mock.queryItem(data,function(data){
        res.end(baseRes({node:data[0].list}));
    });
};

Mock.get_mock_detail = function(req,res){
    mock.query(req.query,function(list){
        res.end(baseRes({nodes:list[0]}));
    },{'list.detail':0});
};

Mock.post_add_mock_item = function(req,res){
    mock.addItem(req.body,function(data){
        res.end(baseRes(data));
    });
};

Mock.post_update_mock_item = function(req,res){
    mock.updateItem(req.body,function(data){
        res.end(baseRes({mock:data[0]}));
    });
};

Mock.post_del_mock_item = function(req,res){
    mock.deleteItem(req.body,function(){
        res.end(baseRes({}));
    });
};

Mock.get = function(req,res){
    var data = {
        _id : req.params.mockId
    };

    data.search = {
        'list.url':req.params[0],
        'list.method':'get'
    };

    mock.queryItem(data,function(data){
        var resData = generateMockData(safeGetValue(data,'0.list.response'));
        res.set({
            'Access-Control-Allow-Origin':'*'
        });
        res.end(baseRes(resData));
    });
};

Mock.get_mock_tpl = function(req,res){
    var data = {
        _id : req.params.mockId
    };

    data.search = {
        'list.url':req.params[0],
        'list.method':req.query.method || 'get'
    };

    mock.queryItem(data,function(data){
        var resData = safeGetValue(data,'0.list');
        
        res.jsonp(baseRes(resData));
    });
};

Mock.post = function(req,res){
    var data = {
        _id : req.params.mockId
    };

    data.search = {
        'list.url':req.params[0],
        'list.method':'post'
    };

    mock.queryItem(data,function(data){
        var resData = generateMockData(safeGetValue(data,'0.list.response'));
        res.set({
            'Access-Control-Allow-Origin':'*'
        });
        res.end(baseRes(resData));
    });
};

function generateMockData(list){
    var data = {};

    if(!list || !list.length){
        return data;
    }

    for(var i= 0,l=list.length;i<l;i++){
        var n = list[i];
        var key = n.name + (n.rule ? ('|'+n.rule) : '');
        var value = n.type ? ('@'+n.type) : n.value;

        data[key] = value;
    }

    return mockjs.mock(data);
}

function safeGetValue(o,exp){
    var exps = exp.split('.');
    try{
        while(exp = exps.shift()){
            o = o[exp];
        }
        return o;
    }catch(e){
        return;
    }
}

module.exports = Mock;
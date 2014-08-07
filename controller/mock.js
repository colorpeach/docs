var Mock = {};
var mockjs = require("mockjs");
var mock = require('../models/mock.js');
var baseRes = require('./baseResponse');


Mock.get = function(req,res){
    var url = req.url;
    mock.query(req.params,function(err,data){
        
    });
};

Mock.post = function(req,res){
    
};

Mock.get_user_mocks = function(req,res){
    var user = req.session.user.login;
    mock.query({user:user},function(list){
        res.end(baseRes({mocks:list}));
    },{detail:0});
};

Mock.get_mock_detail = function(req,res){
    req.query.user = req.session.user.login;
    mock.query(req.query,function(list){
        res.end(baseRes({mock:list[0]}));
    },{'detail':0});
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

module.exports = Mock;
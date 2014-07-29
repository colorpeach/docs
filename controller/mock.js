var Mock = {};
var mockjs = require("mockjs");
var mockjs = require('../models/mockjs');


Mock.get = function(req,res){
    var url = req.url;
    Mock.query(req.params,function(err,data){
        
    });
};

Mock.post = function(req,res){
    
};

module.exports = Mock;
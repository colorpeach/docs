var Mock = {};
var mockjs = require("mockjs");
var mock = require('../models/mock.js');


Mock.get = function(req,res){
    var url = req.url;
    mock.query(req.params,function(err,data){
        
    });
};

Mock.post = function(req,res){
    
};

module.exports = Mock;
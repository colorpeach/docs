var Org = require('../models/org');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //获取对应组织的所有成员
    app.get('/get/org/users',function(req,res){

    });

    //获取对应组织内所有分享的文档
    app.get('/get/org/docs',function(req,res){

    });

    //获取对应用户在对应组织内分享的文档
    app.get('/get/org/user/docs',function(req,res){

    });

    //创建组织
    app.post('/post/create/org',function(req,res){
        req.body.owner = req.session.user.login;
        var org = new Org(req.body);

        org.save(function(data){
            res.end(baseRes(data));
        });
    });
};
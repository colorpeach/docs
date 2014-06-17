var User = require('../models/user');
var Doc = require('../models/doc');
var Org = require('../models/org');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //获取用户创建的文档
    app.get('/get/user/docs',function(req,res){
        Doc.query({user:req.session.user.login},function(list){
            res.end(baseRes({docs:list}));
        });
    });

    //获取用户创建的组织
    app.get('/get/user/orgs',function(req,res){
        Org.query({owner:req.session.user.login},function(list){
            res.end(baseRes({orgs:list}));
        });
    });

    //获取用户加入的组织
    app.get('/get/user/join/orgs',function(req,res){
        Org.queryJoinOrgs({user:req.session.user.login},function(list){
            res.end(baseRes({orgs:list}));
        });
    });

    //获取用户所有组织下的所有文档
    app.get('/get/user/orgs/docs',function(req,res){

    });

    //用户加入组织或退出组织
    app.post('/post/user/join/org',function(req,res){
        var org = new Org(req.body);
        var user = req.session.user.login;
        var data = {_id:+org._id,password:org.password};

        Org.query(data,function(list){
            if(list.length){
                if(list[0].owner === user){
                    res.end(baseRes({errorMsg:['你是该组织创建者']}));
                }else{
                    Org.queryJoinOrgs({user:req.session.user.login,org:org._id},function(list){
                        if(list.length){
                            res.end(baseRes({errorMsg:['你已经加入了该组织']}));
                        }else{
                            org.addMember(user,function(data){
                                res.end(baseRes(data));
                            });
                        }
                    });
                }
            }else{
                res.end(baseRes({errorMsg:['组织不存在或密码错误']}));
            }
        });
    });
};
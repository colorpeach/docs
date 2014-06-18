var Org = require('../models/org');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //获取对应组织的所有成员
    app.get('/get/org/users',function(req,res){
        Org.getMembers({org:req.body._id},function(list){
            res.end(baseRes({members:list}));
        });
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
    
    //向组织分享文档
    app.post('/post/org/add/doc',function(req,res){
        var link = req.body.link,
            data= req.body;
            
        delete data.link
        if(link != 'false'){
            Org.linkDoc(data,function(r){
                res.end(baseRes(r));
            });
        }else{
            Org.delDoc(data,function(r){
                res.end(baseRes(r));
            });
        }
    });
};

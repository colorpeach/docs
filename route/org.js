var org = require('../models/org');
var orgDoc = require('../models/org.doc');
var orgUser = require('../models/org.user');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //获取对应组织的所有成员
    app.get('/get/org/users',function(req,res){
        orgUser.queryUsers(req.query,function(list){
            res.end(baseRes({members:list}));
        },{password:0});
    });

    //获取对应组织内所有分享的文档
    app.get('/get/org/docs',function(req,res){
        orgDoc.queryDocs(req.body,function(data){
            res.end(baseRes({docs:data}));
        });
    });

    //获取对应用户在对应组织内分享的文档
    app.get('/get/org/user/docs',function(req,res){
        
    });

    //创建组织
    app.post('/post/create/org',function(req,res){
        req.body.owner = req.session.user.login;
        org.add(req.body,function(data){
            res.end(baseRes(data[0]));
        });
    });
    
    //向组织分享文档
    app.post('/post/org/add/doc',function(req,res){
        orgDoc.add(req.body,function(data){
            res.end(baseRes(data));
        });
    });
    
    //取消向组织分享文档
    app.post('/post/org/del/doc',function(req,res){
        orgDoc.del(req.body,function(data){
            res.end(baseRes(data));
        });
    });
    
    //用户加入组织
    app.post('/post/org/add/user',function(req,res){
        var user = req.session.user.login;
            req.body.code = +req.body.code;
            org.query(req.body,function(list){
               if(list.length){
                   var orgObj = list[0];
                   var data = {user:req.session.user.login,org:''+orgObj._id};
                   if(list[0].owner === user){
                       res.end(baseRes({errorMsg:['你是该组织创建者']}));
                   }else{
                       orgUser.query(data,function(list){
                           if(list.length){
                               res.end(baseRes({errorMsg:['你已经加入了该组织']}));
                           }else{
                               orgUser.add(data,function(data){
                                   res.end(baseRes(orgObj));
                               });
                           }
                       });
                   }
               }else{
                   res.end(baseRes({errorMsg:['组织不存在或密码错误']}));
               }
            });
    });
    
    //用户退出组织
    app.post('/post/org/del/user',function(req,res){
        orgUser.del(req,data,function(data){
            res.end(baseRes(data));
        });
    });
};

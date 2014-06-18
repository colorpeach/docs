var Doc = require('../models/doc');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app){
    //首页
    app.get('/',function(req,res){
        Doc.query({auth:"public"},function(list){
            res.render('index',{docs:list,user:req.session.user});
        });
    });

    //登陆页面
    app.get('/login',function(req,res){
        res.render('login',{login:true,backurl:req.query.backurl||'/'});
    });

    //登出
    app.get('/logout',function(req,res){
        req.session.destroy(function(){
            res.redirect(req.headers.referrer||'/');
        });
    });

    //编辑页面
    app.get('/edit',function(req,res){
        if(req.query._id){
            Doc.query({_id:new ObjectID(req.query._id)},function(list){
                var doc = list[0];
                if(doc.user === req.session.user.login){
                    res.render('edit',{user:req.session.user,doc:list[0]||{}});
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.render('edit',{user:req.session.user,doc:{}});
        }
    });

    //文档页面
    app.get('/:user/:doc',function(req,res){
        Doc.query({title:req.params.doc,user:req.params.user},function(list){
            res.render('doc',{
                doc:list ? list[0] : {},
                user:req.session.user
            });
        });
    });

    //个人中心页面
    app.get('/account',function(req,res){
        res.render('account',{user:req.session.user});
    });
};
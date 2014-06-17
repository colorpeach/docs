var Doc = require('../models/doc');

module.exports = function(app){
    //首页
    app.get('/',function(req,res){
        Doc.query({auth:"public"},function(list){
            res.render('index',{docs:list,user:req.session.user});
        });
    });

    //登陆页面
    app.get('/login',function(req,res){
        if(req.session.user){
            res.redirect("/");
            return;
        }
        res.render('login',{login:true});
    });

    //登出
    app.get('/logout',function(req,res){
        req.session.destroy(function(){
            res.end();
        });
    });

    //编辑页面
    app.get('/edit',function(req,res){
        if(!req.session.user){
            res.redirect("/login");
            return;
        }
        if(req.query.user && req.query.user === req.session.user.login && req.query._id){
            Doc.query({_id:new ObjectID(req.query._id)},function(list){
                res.render('edit',{user:req.session.user,doc:list[0]||{}});
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
        if(!req.session.user){
            res.redirect("/login");
            return;
        }
        res.render('account',{user:req.session.user});
    });

};
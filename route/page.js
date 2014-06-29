var doc = require('../models/doc');
var deck = require('../models/deck');
var user = require('../models/user');

module.exports = function(app){
    //首页
    app.get('/',function(req,res){
        doc.query({auth:"public"},function(list){
            res.render('index',{docs:list,user:req.session.user});
        },{content:0});
    });

    //登陆页面
    app.get('/login',function(req,res){
        res.render('login',{login:true,backurl:req.query.backurl||'/'});
    });

    //登出
    app.get('/logout',function(req,res){
        req.session.destroy(function(){
            res.redirect(req.headers.referer||'/');
        });
    });

    //编辑页面
    app.get('/edit',function(req,res){
        if(req.query._id){
            doc.query({_id:req.query._id},function(list){
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
    
    //deck页面
    app.get('/deck',function(req,res){
        if(req.query._id){
            deck.query({_id:req.query._id},function(list){
                var deck = list[0];
                if(deck.user === req.session.user.login){
                    res.render('deck',{user:req.session.user,deck:list[0]||{}});
                }else{
                    res.redirect('/');
                }
            });
        }else{
            res.render('deck',{user:req.session.user,deck:{}});
        }
    });
    
    //slide页面
    app.get('/slide/:user/:deck',function(req,res){
        deck.query({title:req.params.deck,user:req.params.user},function(list){
            res.render('slide',{
                deck:list ? list[0] : {},
                user:req.session.user
            });
        });
    });

    //个人中心页面
    app.get('/account/:user',function(req,res){
        if(req.session.user && req.params.user === req.session.user.login){
            res.render('account',{user:req.session.user});
        }else{
            user.query({username:req.params.user},function(data){
                if(data.length){
                    if(req.session.user){
                        res.render('info',{user:req.session.user,owner:data[0]});
                    }else{
                        res.render('info',{owner:data[0]});
                    }
                }else{
                    res.render('notfound');
                }
            });
        }
    });

    //文档页面
    app.get('/doc/:user/:doc',function(req,res){
        doc.query({title:req.params.doc,user:req.params.user},function(list){
            res.render('doc',{
                doc:list ? list[0] : {},
                user:req.session.user
            });
        });
    });
};

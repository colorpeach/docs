var doc = require('../models/doc');
var deck = require('../models/deck');
var user = require('../models/user');


var page = {};

//首页
page.index = function(req,res){
    doc.query({auth:"public"},function(list){
        res.render('index',{docs:list,user:req.session.user});
    },{content:0});
}

//登陆页面
page.login = function(req,res){
    var referer = req.headers.referer;
    res.render('login',{
        login:true,
        backurl:req.query.backurl || referer || '/'
    });
}

//登出
page.logout = function(req,res){
    req.session.destroy(function(){
        res.redirect(req.headers.referer||'/');
    });
}

//编辑页面
page.edit = function(req,res){
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
}

//deck页面
page.deck = function(req,res){
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
}

//slide页面
page.slide_User_Deck = function(req,res){
    deck.query({title:req.params.deck,user:req.params.user},function(list){
        res.render('slide',{
            deck:list ? list[0] : {},
            user:req.session.user
        });
    });
}

//个人中心页面
page.account_User = function(req,res){
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
}

//文档页面
page.doc_User_Doc = function(req,res){
    doc.query({title:req.params.doc,user:req.params.user},function(list){
        res.render('doc',{
            doc:list ? list[0] : {},
            user:req.session.user
        });
    });
}

//box-shadow编辑器
page.boxshadoweditor = function(req,res){
    res.render('boxshadoweditor',{
        user:req.session.user
    });
}

module.exports = page;

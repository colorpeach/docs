var user = require('../models/user');
var doc = require('../models/doc');
var deck = require('../models/deck');
var org = require('../models/org');
var orgUser = require('../models/org.user');
var orgDoc = require('../models/org.doc');
var baseRes = require('./baseResponse');
var User = {};

//获取用户公开文档
User.fetch_user_docs = function(req,res){
    doc.query({user:req.query.owner,auth:'public'},function(list){
        res.end(baseRes({docs:list}));
    },{content:0});
}

//获取用户创建的文档
User.get_user_docs = function(req,res){
    doc.query({user:req.session.user.login},function(list){
        res.end(baseRes({docs:list}));
    },{content:0});
}

//获取用户创建的幻灯片
User.get_user_decks = function(req,res){
    deck.query({user:req.session.user.login},function(list){
        res.end(baseRes({decks:list}));
    },{content:0});
}

//获取用户创建和加入的组织
User.get_user_orgs = function(req,res){
//         org.query({owner:req.session.user.login},function(list){
//             res.end(baseRes({orgs:list}));
//         });
    orgUser.queryOrgs({user:req.session.user.login},function(list){
        res.end(baseRes({orgs:list}));
    });
}

//获取用户加入的组织
//     User./get/user/_join/orgs = function(req,res){
//         orgUser.queryOrgs({user:req.session.user.login},function(list){
//             res.end(baseRes({orgs:list}));
//         });
//     });

//获取用户所有组织下的所有文档
User.get_user_orgs_docs = function(req,res){
    orgUser.query({user:req.session.user.login},function(list){
        var l = list.map(function(n){ return n.org;});
        orgDoc.queryDocs({org:{$in:l}},function(list){
            res.end(baseRes({docs:list}));
        },{content:0})
    });
}

//用户登录
User.login = function(req,res){
    user.query(req.body,function(list){
        if(list.length){
            req.session.user = list[0];
            res.end(baseRes());
        }else{
            res.end(baseRes({errorMsg:['用户名或密码不正确']}));
        }
    });
}

//用户注册
User.register = function(req,res){
    user.query({username:req.body.username},function(list){
        if(list.length){
            res.end(baseRes({errorMsg:['用户已存在']}));
        }else{
            user.add(req.body,function(data){
                req.session.user = data[0];
                res.end(baseRes());
            });
        }
    });
}

module.exports = User;

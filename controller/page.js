var doc = require('../models/doc');
var deck = require('../models/deck');
var user = require('../models/user');


var page = {};

//首页
page.index = function(req,res){
    var data = {
        user:req.session.user,
        tools:[
//             {
//                 'title':'boxshadow图标工具',
//                 'name':'boxshadoweditor',
//                 'img':'mark-box-shadow'
//             },
            {
                'title':'markdown编辑器',
                'name':'edit',
                'img':'mark-markdown'
            },
            {
                'title':'slide幻灯片编辑器',
                'name':'deck',
                'img':'mark-slide'
            },
            {
                'title':'Mock数据生成器',
                'name':'mock',
                'img':'mark-mock'
            },
//             {
//                 'title':'网页截图',
//                 'name':'screanshot',
//                 'img':'xicon-screenshot'
//             },
            {
                'title':'可视化布局工具',
                'name':'layout',
                'img':'mark-layout'
            }
        ],
        projects:[
            {
                'title':'Xicon—纯css图标',
                'name':'Xicon',
                'img':'mark-xicon',
                'github':'https://github.com/colorpeach/Xicon'
            }
        ]
    };
    res.render('index',data);
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
                res.render('tools/edit/edit',{user:req.session.user,doc:list[0]||{}});
            }else{
                res.redirect('/');
            }
        });
    }else{
        res.render('tools/edit/edit',{user:req.session.user,doc:{}});
    }
}

//deck页面
page.deck = function(req,res){
    if(req.query._id){
        deck.query({_id:req.query._id},function(list){
            var deck = list[0];
            if(deck.user === req.session.user.login){
                res.render('tools/deck/deck',{user:req.session.user,deck:list[0]||{}});
            }else{
                res.redirect('/');
            }
        });
    }else{
        res.render('tools/deck/deck',{user:req.session.user,deck:{}});
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

//修改密码页面
page.modifypassword = function(req,res){
    if(req.session.user && req.params.user === req.session.user.login){
        res.render('modifypassword',{user:req.session.user});
    }else{
        res.render('notfound');
    }
}
module.exports = page;


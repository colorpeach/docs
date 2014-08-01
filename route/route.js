var org = require('../controller/org.js');
var doc = require('../controller/doc.js');
var deck = require('../controller/deck.js');
var user = require('../controller/user.js');
var page = require('../controller/page.js');
var photo = require('../controller/photo.js');
var tools = require('../controller/tools.js');
var mock = require('../controller/mock.js');

var settings = require('../settings');
var authPath = settings.authPath;
var authAjaxPath = settings.authAjaxPath;
var unauthAjaxPath = settings.unauthAjaxPath;
var unauthPath = settings.unauthPath;
var staticPath = settings.staticPath;
var validPath = authPath.concat(unauthPath,authAjaxPath,unauthAjaxPath,staticPath,'favicon.ico');

module.exports = function(app){
    //权限
    app.all('*',function(req,res,next){
        var path = req._parsedUrl.pathname.split('/')[1];

        if(validPath.indexOf(path) >= 0){
            
            if(!req.session.user){
                if(authAjaxPath.indexOf(path) >= 0){
                    //访问未授权信息
                    res.statusCode = 401;
                    res.end();
                }else if(authPath.indexOf(path) >= 0){
                    //访问未授权页面
                    res.redirect('/login?backurl='+req.url);
                    return;
                }
            }
            
            next();
        }else{
            res.render('notfound',{user:req.session.user});
        }
    });
    
    //首页
    app.get('/',page.index);

    //登陆页面
    app.get('/login',page.login);

    //登出
    app.get('/logout',page.logout);

    //编辑页面
    app.get('/edit',page.edit);
    
    //deck页面
    app.get('/deck',page.deck);
    
    //slide页面
    app.get('/slide/:user/:deck',page.slide_User_Deck);

    //个人中心页面
    app.get('/account/:user',page.account_User);

    //修改密码页面
    app.get('/modifypassword/:user',page.modifypassword);

    //文档页面
    app.get('/doc/:user/:doc',page.doc_User_Doc);
    
    //工具
    app.get('/tools/:tool',tools.page);
    
    //mock数据get
    app.get('/mock/*',mock.get);
    
    //mock数据post
    app.post('/mock/*',mock.post);
    
    
     //获取用户公开文档
    app.get('/fetch/user/docs',user.fetch_user_docs);

    //获取用户创建的文档
    app.get('/get/user/docs',user.get_user_docs);

    //获取用户创建的幻灯片
    app.get('/get/user/decks',user.get_user_decks);
    
     //获取用户公开幻灯片
    app.get('/fetch/user/decks',user.fetch_user_decks);

    //获取用户创建和加入的组织
    app.get('/get/user/orgs',user.get_user_orgs);

    //获取用户所有组织下的所有文档
    app.get('/get/user/orgs/docs',user.get_user_orgs_docs);

    //用户登录
    app.post('/login',user.login);

    //用户注册
    app.post('/register',user.register);

    //用户修改密码
    app.post('/post/user/editpwd',user.post_editpwd)
    
    //获取与文档有关联的所有组织
    app.get('/get/doc/orgs',doc.get_doc_orgs);

    //添加文档
    app.post('/post/add/doc',doc.post_add_doc);

    //删除文档
    app.post('/post/del/doc',doc.post_del_doc);

    //更新文档
    app.post('/post/update/doc',doc.post_update_doc);
    
    
    //获取与幻灯片有关联的所有组织
    app.get('/get/deck/orgs',deck.get_deck_orgs);
    
    //添加幻灯片
    app.post('/post/add/deck',deck.post_add_deck);

    //删除幻灯片
    app.post('/post/del/deck',deck.post_del_deck);

    //更新幻灯片
    app.post('/post/update/deck',deck.post_update_deck);
    
    
    //获取对应组织的所有成员
    app.get('/get/org/users',org.get_org_users);

    //获取对应组织内所有分享的文档
    app.get('/get/org/docs',org.get_org_docs);

    //创建组织
    app.post('/post/create/org',org.post_create_org);
    
    //向组织分享文档
    app.post('/post/org/add/doc',org.post_org_add_doc);
    
    //取消向组织分享文档
    app.post('/post/org/del/doc',org.post_org_del_doc);
    
    //用户加入组织
    app.post('/post/org/add/user',org.post_org_add_user);
    
    //用户退出组织
    app.post('/post/org/del/user',org.post_org_del_user);

    //获取图片
    app.get('/get/img',photo.get_img);

    //保存图片
    app.post('/photo/save_img',photo.post_save_img);

    app.get('/demo',function(req,res){
        res.render('demo');
    });
};

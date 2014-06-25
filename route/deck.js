var deck = require('../models/deck');
var orgDoc = require('../models/org.doc');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //添加幻灯片
    app.post('/post/add/deck',function(req,res){
        req.body.user = req.session.user.login;
        deck.add(req.body,function(data){
            res.end(baseRes({deck:data}));
        });
    });

    //删除幻灯片
    app.post('/post/del/deck',function(req,res){
        deck.del(req.body,function(data){
            res.end(baseRes(data));
        });
    });

    //更新幻灯片
    app.post('/post/update/deck',function(req,res){
        deck.update(req.body,function(data){
            res.end(baseRes({deck:data}));
        });
    });
};

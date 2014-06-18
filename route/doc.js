var Doc = require('../models/doc');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //获取与文档有关联的所有组织
    app.get('/get/doc/orgs',funtion(req,res){
        var doc = new Doc(req.body);
        doc.linkedOrg(function(data){
            data = (data||[]).map(function(n){return n.org});
            res.end(baseRes({orgs:data}));
        });
    });

    //添加文档
    app.post('/post/add/doc',function(req,res){
        req.body.user = req.session.user.login;
        var doc = new Doc(req.body);
        doc.save(function(data){
            res.end(baseRes({doc:data}));
        });
    });

    //删除文档
    app.post('/post/del/doc',function(req,res){
        var doc = new Doc(req.body);
        doc.del(function(data){
            res.end(baseRes(data));
        });
    });

    //更新文档
    app.post('/post/update/doc',function(req,res){
        req.body.user = req.session.user.login;
        var doc = new Doc(req.body);
        doc.save(function(data){
            res.end(baseRes({doc:data}));
        });
    });
};

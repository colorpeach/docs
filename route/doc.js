var doc = require('../models/doc');
var orgDoc = require('../models/org.doc');
var baseRes = require('./baseResponse');

module.exports = function(app){
    //获取与文档有关联的所有组织
    app.get('/get/doc/orgs',function(req,res){
        orgDoc.queryOrgs(req.query,function(data){
            res.end(baseRes({orgs:data}));
        });
    });

    //添加文档
    app.post('/post/add/doc',function(req,res){
        req.body.user = req.session.user.login;
        doc.add(req.body,function(data){
            res.end(baseRes({doc:data}));
        });
    });

    //删除文档
    app.post('/post/del/doc',function(req,res){
        doc.del(req.body,function(data){
            res.end(baseRes(data));
        });
    });

    //更新文档
    app.post('/post/update/doc',function(req,res){
        doc.update(req.body,function(data){
            res.end(baseRes({doc:data}));
        });
    });
};

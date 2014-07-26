var doc = require('../models/doc');
var orgDoc = require('../models/org.doc');
var baseRes = require('./baseResponse');
var Doc = {};

//获取与文档有关联的所有组织
Doc.get_doc_orgs = function(req,res){
    orgDoc.queryOrgs(req.query,function(data){
        res.end(baseRes({orgs:data}));
    });
}

//添加文档
Doc.post_add_doc = function(req,res){
    req.body.user = req.session.user.login;
    doc.add(req.body,function(data){
        res.end(baseRes({doc:data[0]}));
    });
}

//删除文档
Doc.post_del_doc = function(req,res){
    doc.del(req.body,function(data){
        res.end(baseRes(data));
    });
}

//更新文档
Doc.post_update_doc = function(req,res){
    doc.update(req.body,function(data){
        res.end(baseRes({doc:data}));
    });
}

module.exports = Doc;

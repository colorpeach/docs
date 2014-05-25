var Doc = require('../models/doc');

//页面路由
module.exports = function(app){
  
  app.get('/api',function(req,res){
    res.render('todo/index');
  });
  
  app.get('/',function(req,res){
    Doc.query(null,function(list){
      res.render('index',{docs:list});
    });
  });
  
  app.get('/login',function(req,res){
    res.render('login');
  });
  
  app.get('/edit',function(req,res){
    res.render('edit');
  });
  
  app.get('/account',function(req,res){
    res.render('account');
  });
  
  app.get('/help',function(req,res){
    res.render('help');
  });
  
  app.get('/docs/:doc',function(req,res){
    Doc.query({title:req.params.doc},function(list){
      res.render('doc',{
        doc:list ? list[0] : {}
      });
    });
  });
};
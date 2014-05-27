var Doc = require('../models/doc'),
    https = require('https'),
    ObjectID = require('mongodb').ObjectID;

//页面路由
module.exports = function(app){
  
  app.get('/api',function(req,res){
    res.render('todo/index');
  });
  
  app.get('/',function(req,res){
    Doc.query(null,function(list){
      res.render('index',{docs:list,user:req.session.user});
    });
  });
  
  app.get('/login',function(req,res){
    if(req.session.user){
      res.redirect("/");
      return;
    }
    res.render('login');
  });
  
  app.get('/edit',function(req,res){
    if(!req.session.user){
      res.redirect("/login");
      return;
    }
    if(req.query.user && req.query.user === req.session.user.login && req.query._id){
      Doc.query({_id:new ObjectID(req.query._id)},function(list){
        res.render('edit',{user:req.session.user,doc:list[0]||{}});
      });
    }else{
      res.render('edit',{user:req.session.user,doc:{}});
    }
  });
  
  app.get('/account',function(req,res){
    if(!req.session.user){
      res.redirect("/login");
      return;
    }
    res.render('account',{user:req.session.user});
  });
  
  app.get('/help',function(req,res){
    res.render('help',{user:req.session.user});
  });
  
  app.get('/:user/:doc',function(req,res){
    Doc.query({title:req.params.doc,user:req.params.user},function(list){
      res.render('doc',{
        doc:list ? list[0] : {},
        user:req.session.user
      });
    });
  });
};
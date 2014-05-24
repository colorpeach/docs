var rs = require("../models/readFile");
//页面路由
module.exports = function(app){
  app.get('/api',function(req,res){
    res.render('todo/index');
  });
  
  app.get('/',function(req,res){
    res.render('index',{docs:[{title:"前端编码规范",content:"ddddd"}]});
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
  
  app.get('/users/:user',function(req,res){
    res.end(req.user);
  });
};
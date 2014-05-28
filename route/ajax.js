var rs = require("../models/readFile");
var Doc = require("../models/doc");

//ajax请求处理
module.exports = function(app){
  app.get('/get',function(req,res){
      rs({
        url:"./client/lib/angular/1.1.5/angular.js",
        callback:function(data){
          res.end(JSON.stringify({str:data.toString("utf-8")}));
        }
      });
  });
  
  app.post('/login',function(req,res){
    res.end(JSON.stringify(req.body));
  });
  
  app.post('/logout',function(req,res){
    req.session.destroy(function(){
      res.redircet('/');
    });
  });

  app.post('/addDoc',function(req,res){
    req.body.user = req.session.user.login;
    var doc = new Doc(req.body);
    doc.save(function(data){
        res.end(JSON.stringify({doc:data[0]}));
    });
  });
  
  app.post('/getDoc',function(req,res){
    Doc.query({user:req.session.user.login},function(list){
      res.end(JSON.stringify({docs:list}));
    });
  })
};
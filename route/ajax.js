var rs = require("../models/readFile");
var Doc = require("../models/doc");
var baseRes = require("./baseResponse");

//ajax请求处理
module.exports = function(app){
  app.get('/get',function(req,res){
      rs({
        url:"./client/lib/angular/1.1.5/angular.js",
        callback:function(data){
          res.end(baseRes({str:data.toString("utf-8")}));
        }
      });
  });
  
  app.post('/login',function(req,res){
    res.end(baseRes(req.body));
  });
  
  app.post('/logout',function(req,res){
    req.session.destroy(function(){
      res.end();
    });
  });

  app.post('/addDoc',function(req,res){
    req.body.user = req.session.user.login;
    var doc = new Doc(req.body);
    doc.save(function(data){
        res.end(baseRes({doc:data}));
    });
  });
  
  app.post('/getDoc',function(req,res){
    Doc.query({user:req.session.user.login},function(list){
      res.end(baseRes({docs:list}));
    });
  })
};
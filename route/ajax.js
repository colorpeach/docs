var rs = require('../models/readFile');
var Doc = require('../models/doc');
var User = require('../models/user');
var Org = require('../models/org');
var baseRes = require('./baseResponse');

//ajax请求处理
module.exports = function(app){
  app.get('/get',function(req,res){
      rs({
        url:'./client/lib/angular/1.1.5/angular.js',
        callback:function(data){
          res.end(baseRes({str:data.toString('utf-8')}));
        }
      });
  });
  
  app.post('/register',function(req,res){
    var user = new User(req.body);

    User.query({login:req.body.username},function(list){
      if(list.length){
        res.end(baseRes({errorMsg:['用户已存在']}));
      }else{
        user.save(function(data){
            req.session.user = user;
            res.end(baseRes({doc:data}));
        });
      }
    });
  });
  
  app.post('/login',function(req,res){
    var user = new User(req.body);
    User.query(user,function(list){
      if(list.length){
        req.session.user = user;
        res.end(baseRes());
      }else{
        res.end(baseRes({errorMsg:['用户名或密码不正确']}));
      }
    });
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
  });
  
  app.post('/delDoc',function(req,res){
    var doc = new Doc(req.body);
    doc.del(function(data){
      res.end(baseRes(data));
    });
  });
  
  app.post('/createOrg',function(req,res){
    req.body.owner = req.session.user.login;
    var org = new Org(req.body);

    org.save(function(data){
      res.end(baseRes(data));
    });
  });
  
  app.post('/getOrgs',function(req,res){
    Org.query({owner:req.session.user.login},function(list){
      res.end(baseRes({orgs:list}));
    });
  });
  
  app.post('/joinOrg',function(req,res){
    var org = new Org(req.body);
    var user = req.session.user.login;
    var data = {_id:+org._id,password:org.password};

    Org.query(data,function(list){
      if(list.length){
        if(list[0].owner === user){
          res.end(baseRes({errorMsg:['你是该组织创建者']}));
        }else{
          Org.queryJoinOrgs({user:req.session.user.login,org:org._id},function(list){
            if(list.length){
              res.end(baseRes({errorMsg:['你已经加入了该组织']}));
            }else{
              org.addMember(user,function(data){
                res.end(baseRes(data));
              }); 
            }
          });
        }
      }else{
        res.end(baseRes({errorMsg:['组织不存在或密码错误']}));
      }
    });
  });

  app.post('/getJoinOrgs',function(req,res){
    Org.queryJoinOrgs({user:req.session.user.login},function(list){
      res.end(baseRes({orgs:list}));
    });
  });

  app.post('/getMembers',function(req,res){
    Org.getMembers({org:req.body._id},function(list){
      res.end(baseRes({members:list}));
    });
  });
  
  app.post('/docLinkOrg',function(req,res){
    var link = req.body.link,
        data= req.body;
        
    delete data.link
    if(link != 'false'){
      Org.linkDoc(data,function(r){
        res.end(baseRes(r));
      });
    }else{
      Org.delDoc(data,function(r){
        res.end(baseRes(r));
      });
    }
  });
  
  app.post('/getDocOrg',function(req,res){
    var doc = new Doc(req.body);
    doc.linkedOrg(function(data){
      data = (data||[]).map(function(n){return n.org});
      res.end(baseRes({orgs:data}));
    });
  });
};
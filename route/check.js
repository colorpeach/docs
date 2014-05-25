var $request = require('./request');
var https = require('https');
var checkInfo = {
  client_id:"c89c9272fa8cebcf607b",
  client_secret:"75809b6191cb17e10519d0d440b8b2076aaf92d0"
};

module.exports = function(app,sessionStore){
  app.get('/checkGithub',function(req,res){
    var code = req.query.code;
    if(code){
      var request = $request('https',{
        host: 'github.com',
        path: '/login/oauth/access_token',
        method: 'post',
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      },function(data){
        var d = JSON.parse(data);

        var get = https.get({
              host:'api.github.com',
              path:'/user?access_token='+d.access_token,
              method:'get',
              headers:{
                  'User-Agent':'docs'
              }
            },function(response){
              var data = '';
              response.on('data',function(d){
                data += d.toString('utf-8');
              });

              response.on('end',function(){
                data = JSON.parse(data);

                res.redirect('/');
              });
            });
      });
      
      checkInfo.code = code;
      request.write(JSON.stringify(checkInfo)+"\n");
      request.end();
    }
  });
};
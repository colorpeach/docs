var rs = require("../models/readFile");
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
};
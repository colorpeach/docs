var photo = require('../models/photo');
var user = require('../models/user');
var baseRes = require('./baseResponse');
var fs    = require('fs');
var formidable = require("formidable");

var Photo = {};

//获取图片流
Photo.get_img = function(req,res){
    photo.query({user:req.session.user},function(list){
        if(list.length){
            var type = list[0].type;
            fs.readFile(list[0].url,function(err, data){
                if(err){
                    console.log(err);
                }else{
                    res.writeHead(200,{"Content-Type":type});
                    res.write(data,"binary");
                    res.end();
                }
            })
        }else{
            var data ="";
            res.writeHead(200,{"Content-Type":"image/png"});
            res.write(data,"binary");
            res.end();
        }
    });
}

//保存头像
Photo.post_save_img = function(req,res){
    var form = new formidable.IncomingForm();
    var login = req.session.user.login;
    form.parse(req, function(error, fields, files){
        for(var key in files){
            var file = files[key];
            if(file.type != "image/jpeg" && file.type != "image/png"){
                res.end(baseRes({errorMsg:['格式错误']}));
            }
            fs.readFile(file.path,function(err, data){
                var pic = {
                    login:login,
                    url:file.path,
                    stream:data,
                    type:file.type
                };
                photo.update(pic,function(list){
                    res.end(baseRes({successMsg:['修改成功']}));
                })
//                photo.query({login:login},function(list){
//                    if(list.length){
//                        photo.update(pic,function(data){
//                            res.end(baseRes({successMsg:['修改成功']}));
//                        });
//                    }else{
//                        photo.save(pic,function(data){
//                            res.end(baseRes({successMsg:['修改成功']}));
//                        });
//                    }
//                })
            })
        }
    })
}
module.exports = Photo;
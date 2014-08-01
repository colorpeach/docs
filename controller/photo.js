var photo = require('../models/photo');
var user = require('../models/user');
var baseRes = require('./baseResponse');
var fs    = require('fs');
var formidable = require("formidable");

var Photo = {};

//获取图片流
Photo.get_img = function(req,res){
    photo.query({_id:req.query._id},function(list){
        if(list.length){
            fs.readFile(list[0].url,function(err, data){
                if(err){
                    console.log(err);
                }else{
                    res.writeHead(200,{"Content-Type":"image/png"});
                    res.write(data,"binary");
                    res.end();
                }
            })
        }
    });
}

//保存头像
Photo.post_save_img = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files){
        for(var key in files){
            var file = files[key];
            var fName = (new Date()).getTime();
            fs.readFile(file.path,function(err, data){
                var pic = {
                    url:file.path,
                    stream:data
                };
                var current_user = req.session.user;
                if(current_user.portrait_id == undefined){
                    photo.save(pic,function(data){
                        current_user.portrait_id = data[0]._id;
                        user.update(current_user,function(list){
                            req.session.user = list[0];
                        })
                    });
                }else{
                    photo.update(pic,function(data){
                        console.log(data);
                    });
                }
            })
        }
    })
}
module.exports = Photo;
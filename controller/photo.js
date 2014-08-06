var photo = require('../models/photo');
var baseRes = require('./baseResponse');
var fs    = require('fs');
var formidable = require("formidable");

var Photo = {};
var defaultImg = "iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAC40lEQVRoQ+2a147qMBCGJ/QqLhBC9PL+70QHIcQFotfdHaSsIJBN4vzjs2eT3Cae+POMx1NsfHw9FKDHCIH/uLZDDf9xBZMWDS+XSzqdTnS5XN6uZywWo0QiQcViUXy9RYFnsxkdj0e63W6uQCKRCCWTSapUKq6+V/lIDHg4HNpq1GmirPFms+n0mdJ7EeDBYEDX61VpQuagaDRKrVbLl4x3g+HAo9GIzuczZKLxeJwajQZElikECrxYLGi9XkMnmM/nqVQqwWRCgf3sWzsi9H6GAvd6PUKH5oZhUKfT+X0aljBnkxJp1jAN85m73+9hmngUlE6nYWczDHg8Ht+jKYmHo7B6vQ4RDQNGHkdWMuTxFAKr2s1kMrnHzRIPx9e1Wg0iGqbhwDmtwAEHymlxgr9arSB7zE5IoVCAFAgge1jSnM0FQAUfIbCKXUrG0eh4GqJhnpREpvSdtAMzJhiw5D5G7V9eQBgwC2PT3mw2sJyYc+FcLvd7Kx4Mjax6oKsdcA2zwOl0SofDQcX3vYxJpVJUrVYhsr79gUT3EOHA0KUdUWBE5oTMkB5NBOq0HgX70bKUdkX2sAnt55hCHkNWByCmYVWPLeGZtZi0+ZN+v++pe9hut6FeWauG+WdeTFvSlEW99OOqBg7YS70aWX+22xeiTstrbC0RO4vv4fl8fi/XckNctbHG4NwQ5+CjXC5DnRhEw1zT4r4SN8JVIW1N8AueOw/s0BCXXnwBM+hut4N1/J1UyeCZTMYXuBKwblDrQvgB9wyMSAycNOn2vUqC4RqYPe52u3UdNbmdtN/v+G5XNpt1XRVxBYxM6v0C2o13WyxwBEaWbKRgTbluEo8fgREXzKQhrfKdLrTZAv+PsCb8T9BvgSU7gbo0bndN4gVYR9tEF/S7604vwF4Sdl0TV/0PH1nWgsITsI4+r+rkVcd1u92noU/AXpJ11QnoHmetojiew7onKP2/EFh6hf+1/MBp+BPaWEJrznjzpQAAAABJRU5ErkJggg==";
defaultImg = new Buffer(defaultImg,'base64');

//获取图片流
Photo.get_img = function(req,res){
    var data = {login : req.query.user};
    photo.query(data,function(list){
        if(list.length){
            console.log(list[0].stream);
            var img = list[0].stream;
            var type = list[0].type;
            res.writeHead(200,{"Content-Type":type});
            res.write(img,"binary");
            res.end();
        }else{
            res.writeHead(200,{"Content-Type":"image/png"});
            res.write(defaultImg,"binary");
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
                return;
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
            })
        }
    })
}
module.exports = Photo;
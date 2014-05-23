var fs = require("fs");

module.exports = function(opts){
    fs.readFile(opts.url,function(err,data){
        if(err){
            console.log(err);
        }else{
            opts.callback(data);
        }
    });
};
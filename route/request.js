var https = require('https');
var http = require('http');

var request = function(protocol,options,fun){
    var m = protocol === 'https' ? https : http;
    return m.request(options,function(response){
        var data = "";
        response.on('data',function(chunk){
            data += chunk;
        });

        response.on('end',function(){
            if(response.statusCode === 200){
                fun && fun(data);
            }
        });
    });
};

module.exports = request;
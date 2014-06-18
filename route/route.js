var org = require('./org.js');
var doc = require('./doc.js');
var user = require('./user.js');
var escapePath = require('../settings').escapePath.split('|');

module.exports = function(app){
    //权限
    app.all('*',function(req,res){
        //TODO
        if(escapePath.indexOf('') >= 0){
            next();
        }
    });
    
    user(app);
    doc(app);
    org(app);
};

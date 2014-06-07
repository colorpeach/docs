var dbClient = require('../db'),
    ObjectID = require('mongodb').ObjectID;
    
function User(opts){
    this.login = opts.username;
    this.email = opts.email;
    this.password = opts.password;
}

User.prototype.save = function(fn){
    var data = this;
    
    dbClient.connect(function(err,db){
        if(err) throw err;

        db.collection("user").save(data,function(err,list){
            db.close();
            fn && fn(list);
        });
    });
};

User.del = function(){
    
};

User.query = function(query,fn){
    dbClient.connect(function(err,db){
        if(err) throw err;
        
        db.collection("user").find(query||null).toArray(function(err,list){
            db.close();
            fn && fn(list);
        });
    });
};

module.exports = User;
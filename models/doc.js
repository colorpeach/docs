var dbClient = require('../db');

function Doc(opts){
    this.title = opts.title;
    this.content = opts.content;
}

//get all docs
Doc.query = function(query,fun){
    dbClient.connect(function(err,db){
        if(err) throw err;
        
        db.collection("docs").find(query||null).toArray(function(err,list){
            db.close();
            fun && fun(list);
        });
    });
};

//save one doc
Doc.prototype.save = function(){
    
};

Doc.prototype.query = function(){
    
};

Doc.prototype.del = function(){
    
};

module.exports =  Doc;
var dbClient = require('../db'),
    ObjectID = require('mongodb').ObjectID;

function Doc(opts){
    this.data = {
      title : opts.title,
      content : opts.content,
      user : opts.user,
      _id : opts._id
    };
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
Doc.prototype.save = function(fun){
    var data = this.data;
    
    if(!data.user)
        fun && fun([]);
    if(data._id)
        data._id = new ObjectID(data._id);
        
    dbClient.connect(function(err,db){
        if(err) throw err;

        db.collection("docs").save(data,function(err,list){
            db.close();
            fun && fun(list);
        });
    });
};

Doc.prototype.query = function(){
    
};

Doc.prototype.del = function(){
    
};

module.exports =  Doc;
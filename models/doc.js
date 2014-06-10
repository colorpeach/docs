var dbClient = require('../db'),
    ObjectID = require('mongodb').ObjectID;

function Doc(opts){
      this.title = opts.title;
      this.content = opts.content;
      this.user = opts.user;
      this.auth = opts.auth || "public";
      opts._id && (this._id = opts._id);
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

//save a doc
Doc.prototype.save = function(fun){
    var data = this;
    
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

Doc.prototype.del = function(fn){
    var _id = new ObjectID(this._id);
    dbClient.connect(function(err,db){
        if(err) throw err;
    
        db.collection("docs").remove({_id:_id},function(err,data){
            db.close();
            fn && fn(data);
        });
    });
};

Doc.prototype.linkedOrg = function(fn){
    var _id = this._id;
    dbClient.connect(function(err,db){
        if(err) throw err;
        
        db.collection("org.doc").find({doc:_id}).toArray(function(err,list){
            db.close();
            fn && fn(list);
        });
    });
}

module.exports =  Doc;
var dbClient = require('../db'),
    ObjectID = require('mongodb').ObjectID;

function clear(obj){
    for(var n in obj){
        if(obj.hasOwnProperty(n) && obj[n] == undefined){
            delete obj[n];
        }
    }
    return obj;
};

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
    var data = clear(this);
    
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
};

Doc.getPrivateDocs = function(query,fn){
    dbClient.connect(function(err,db){
        if(err) throw err;

        db.collection("org.user").find(query||null).toArray(function(err,list){
            var codes = list.map(function(n){ return n.org;});

            if(codes.length){
                db.collection("org.doc").find({$or:[{org:{$in:codes}},{user:query.user}]}).toArray(function(err,list){
                    var docs = list.map(function(n){return new ObjectID(n.doc);});
                    if(list.length){
                        db.collection("docs").find({_id:{$in:docs}}).toArray(function(err,list){
                            db.close();
                            fn && fn(list);
                        });
                    }else{
                        db.close();
                        fn && fn(list);
                    }
                });
            }else{
                db.close();
                fn && fn(list);
            }
        });
    });
};

module.exports =  Doc;
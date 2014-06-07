var dbClient = require('../db'),
    ObjectID = require('mongodb').ObjectID;
    
function Org(opts){
    this.owner = opts.owner;
    this.name = opts.name;
    this.password = opts.password;
    opts._id && (this._id = opts._id);
}

Org.prototype.save = function(fn){
    var org = this;
    
    dbClient.connect(function(err,db){
        if(err) throw err;

        insertDocument(org,db.collection("org"),function(data){
            db.close();
            fn && fn(org);
        });
    });
};

Org.query = function(query,fn){
    dbClient.connect(function(err,db){
        if(err) throw err;
        
        db.collection("org").find(query||null).toArray(function(err,list){
            db.close();
            fn && fn(list);
        });
    });
};

Org.prototype.addMember = function(user,fn){
    var data = {};
    data.user = user;
    data.org = this._id;
    dbClient.connect(function(err,db){
        if(err) throw err;

        db.collection("orgUser").save(data,function(err,list){
            db.close();
            fn && fn(list);
        });
    });
};

Org.queryJoinOrgs = function(query,fn){
    dbClient.connect(function(err,db){
        if(err) throw err;
        
        db.collection("orgUser").find(query||null).toArray(function(err,list){
            db.close();
            fn && fn(list);
        });
    });
};

//auto increment
function insertDocument(doc, targetCollection,fn) {
    targetCollection.find().sort( { _id: -1 }).limit(1).toArray(function(err,list){
        if(list && list.length){
            doc._id = list[0]._id+1;
        }else{
            doc._id = 10000000;
        }
        targetCollection.insert(doc,fn);
    });
}

module.exports =  Org;
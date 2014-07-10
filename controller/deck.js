var deck = require('../models/deck');
var orgDeck = require('../models/org.deck');
var baseRes = require('./baseResponse');
var Deck = {};

Deck.get_deck_orgs = function(req,res){
    orgDeck.queryOrgs(req.query,function(data){
        res.end(baseRes({orgs:data}));
    });
}

//添加幻灯片
Deck.post_add_deck = function(req,res){
    req.body.user = req.session.user.login;
    deck.add(req.body,function(data){
        res.end(baseRes({deck:data[0]}));
    });
}

//删除幻灯片
Deck.post_del_deck = function(req,res){
    deck.del(req.body,function(data){
        res.end(baseRes(data));
    });
}

//更新幻灯片
Deck.post_update_deck = function(req,res){
    deck.update(req.body,function(data){
        res.end(baseRes({deck:data}));
    });
}


module.exports = Deck;
var org = require('./org.js');
var doc = require('./doc.js');
var deck = require('./deck.js');
var user = require('./user.js');
var page = require('./page.js');
var settings = require('../settings');
var authPath = settings.authPath.split('|');
var authAjaxPath = settings.authAjaxPath.split('|');
var unauthPath = settings.unauthPath.split('|');
var escapePath = authPath.concat(unauthPath,authAjaxPath);

module.exports = function(app){
    //权限
    app.all('*',function(req,res,next){
        var path = req._parsedUrl.pathname.split('/')[1];

        if(escapePath.indexOf(path) >= 0){
            
            if(authAjaxPath.indexOf(path) >= 0 && !req.session.user){
                
                res.statusCode = 401;
                res.end();
            }else if(unauthPath.indexOf(path) < 0 && !req.session.user){
                
                res.redirect('/login?backurl='+req.url);
                return;
            }else if(path === 'login' && req.session.user){
                
                res.redirect('/');
                return;
            }
        }
        next();
    });

    page(app);
    user(app);
    doc(app);
    deck(app);
    org(app);
};

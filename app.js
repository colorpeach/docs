var http = require("http");
var path = require("path");
var express = require("express");
var app = express();
var session = require("express-session");
var settings = require('./settings');

app.set("views",__dirname+"/client/views");
app.set("view engine","jade");

app.use(require('compression')({
    threshold:512
}));
app.use(require('body-parser')());
// app.use(express.favicon());
// app.use(express.logger("dev"));
app.use(require("method-override")());
app.use(require("cookie-parser")());
app.use(session({
    secret: settings.secret,
    name: 'sid',
    cookie: { maxAge:86400000 }
}));

app.use(require("serve-static")(path.join(__dirname,"client")));

app.listen(process.env.PORT || 3000,function(){
    console.log("running");
});

require("./route/route.js")(app);
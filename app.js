var http = require("http");
var path = require("path");
var express = require("express");
// var mysql = require("mysql").createConnection({
//         host : process.env.IP,
//         uesr : "root",
//         datebase : "test"
//     });
// var mysqlStore = require("connect-mysql")(express);
var app = express();

app.set("views",__dirname+"/client/views");
app.set("view engine","jade");

app.use(require('body-parser')());
// app.use(express.favicon());
// app.use(express.logger("dev"));
app.use(require("method-override")());
app.use(require("cookie-parser")());
// app.use(require("express-session")({
//     secret:"supersecretkeygoeshere",
//     store:new mysqlStore({client:mysql})
// }));

app.use(require("serve-static")(path.join(__dirname,"client")));

http.createServer(app).listen(process.env.PORT || 3000,function(){
    console.log("running");
});

require("./route")(app);
var dbClient = require('../db');

function User(opts){
    this.username = opts.username;
    this.email = opts.email;
    this.password = opts.password;
}

User.prototype.save = function(){
    
};

module.exports = User;
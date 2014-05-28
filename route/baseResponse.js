module.exports = function(opts){
    var opt = {
        error:0,
        errorMsg:[]
    };

    for(var n in opts){
        opt[n] = opts[n];
    }

    if(opts.errorMsg){
        error = opts.errorMsg.length;
    }

    return JSON.stringify(opt);
};
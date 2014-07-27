var tools = {};
var map = {
    'edit':'/edit',
    'deck':'/deck'
};

//box-shadow编辑器
tools.page = function(req,res){
    var name = req.params.tool;
    
    if(req.session.user && name in map){
        res.redirect(map[name]);
    }else{
        res.render('tools/'+name+'/'+name,{
            user:req.session.user
        });
    }
}

module.exports = tools;
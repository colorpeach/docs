var tools = {}

//box-shadow编辑器
tools.page = function(req,res){
    var name = req.params.tool;
    res.render('tools/'+name+'/'+name,{
        user:req.session.user
    });
}

module.exports = tools;
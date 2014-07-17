var tools = {}

//box-shadow编辑器
tools.boxshadoweditor = function(req,res){
    res.render('tools/boxshadoweditor/boxshadoweditor',{
        user:req.session.user
    });
}

module.exports = tools;
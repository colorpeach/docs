var projects = {};

projects.page = function(req,res){
    var name = req.params.project;

    res.render('projects/'+name+'/'+name,{
        user:req.session.user
    });
}

module.exports = projects;
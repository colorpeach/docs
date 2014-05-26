(function(){
    var Account = {
        _init:function(){
            var self = this;
            $.ajax({
                url:url.repos,
                method:'get',
                success:function(d){
                    $(".all-repos").html(self.reposHtml(d));
                }
            });
            
            $.ajax({
                url:"/getDoc",
                method:'post',
                success:function(d){
                    var data = JSON.parse(d);
                    $(".all-doc").html(self.docHtml(data.docs));
                }
            });
        },
        docHtml:function(list){
            return $.map(list,function(n){
                return '<li class="list-group-item">'+
                            '<a href="'+n.user+'/'+n.title+'">'+n.title+'</a>'+
                            ' <a href="/edit?user='+n.user+'&_id='+n._id+'">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+
                            '</a>'+
                       '</li>';
            });
        },
        reposHtml:function(list){
            return $.map(list,function(n){
                return '<li class="list-group-item">'+n.name+'</li>';
            });
        },
        init:function(){
            this._init();
        }
    };
    
    Account.init();
})();
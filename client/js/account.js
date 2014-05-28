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
            
            $.docsajax({
                url:"/getDoc",
                method:'post',
                success:function(d){
                    $(".all-doc").html(self.docHtml(d.docs));
                }
            });
        },
        docHtml:function(list){
            return $.map(list,function(n){
                return '<li>'+
                            '<a href="'+n.user+'/'+n.title+'">'+n.title+'</a>'+
                            ' <a href="/edit?user='+n.user+'&_id='+n._id+'">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+
                            '</a>'+
                       '</li>';
            });
        },
        reposHtml:function(list){
            return $.map(list,function(n){
                return '<li>'+n.name+'</li>';
            });
        },
        bindEvent:function(){
            var $tabCons = $('.item-list'),
                $tabs = $('.nav-tabs li');
            $('.nav-tabs').on('click','li',function(){
                var i = $(this).index();
                $tabCons.addClass('hidden')
                    .eq(i).removeClass('hidden');
                $tabs.removeClass('active')
                    .eq(i).addClass('active');
            });
        },
        init:function(){
            this._init();
            this.bindEvent();
        }
    };
    
    Account.init();
})();
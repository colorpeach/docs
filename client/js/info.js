(function(){
    var Account = {
        $allDocs:$('#all-docs'),
        _init:function(){
            var self = this;
            
            $.docsajax({
                url:"/fetch/user/docs",
                data:{owner:$('.account-info p').text()},
                wrap:self.$allDocs,
                success:function(d){
                    self.$allDocs.html(self.docHtml(d.docs));
                }
            });
        },
        docHtml:function(list){
            return $.map(list,function(n){
                var $li = $("<li>"),
                    html = '<a href="/doc/'+n.user+'/'+n.title+'">'+n.title+'</a>';
                return $li.html(html).data('doc',n);
            });
        },
        bindEvent:function(){
            var $tabCons = $('.item-list'),
                $tabs = $('.slide-tabs li'),
                self = this;
                
            $('.slide-tabs').on('click','li',function(){
                var i = $(this).index();
                
                if(!$(this).hasClass('active')){
                    $tabCons.addClass('hidden')
                        .eq(i).removeClass('hidden');
                    $tabs.removeClass('active')
                        .eq(i).addClass('active');
                        
                    self.state.nowTab = $tabCons.eq(i);
                    self.state.showDetail(false);
                }
            });
        },
        init:function(){
            this._init();
            this.bindEvent();
        }
    };
    
    Account.init();
})();

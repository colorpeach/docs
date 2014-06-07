(function(){
    var Account = {
        tabCons:{
            $allDocs:$('#all-docs'),
            $allRepos:$('#all-repos'),
            $myOrgs:$('#my-orgs'),
            $joinOrgs:$('#join-orgs'),
        },
        _init:function(){
            var self = this;
           url.repos && $.ajax({
                url:url.repos,
                method:'get',
                success:function(d){
                    self.tabCons.$allRepos.html(self.reposHtml(d));
                }
            });
            
            $.docsajax({
                url:"/getDoc",
                method:'post',
                success:function(d){
                    self.tabCons.$allDocs.html(self.docHtml(d.docs));
                }
            });
            
            $.docsajax({
                url:"/getOrgs",
                method:'post',
                success:function(d){
                    self.tabCons.$myOrgs.find("ul").append(self.myOrgsHtml(d.orgs));
                }
            });
            
            $.docsajax({
                url:"/getJoinOrgs",
                method:'post',
                success:function(d){
                    self.tabCons.$joinOrgs.find("ul").append(self.joinOrgHtml(d.orgs));
                }
            });
        },
        docHtml:function(list){
            return $.map(list,function(n){
                var $li = $("<li>"),
                    html = '<a href="'+n.user+'/'+n.title+'">'+n.title+'</a>'+
                            ' <a href="/edit?user='+n.user+'&_id='+n._id+'" data-tip="编辑">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+
                            '</a>'+
                            ' <a href="javascript:;" class="del-item" data-tip="删除">'+
                                '<span class="glyphicon glyphicon-remove"></span>'+
                            '</a>';
                return $li.html(html).data('doc',n);
            });
        },
        reposHtml:function(list){
            return $.map(list,function(n){
                return '<li>'+n.name+'</li>';
            });
        },
        myOrgsHtml:function(list){
            return $.map(list,function(n){
                var $li = $('<li>'),
                    html = '<p>组织名称：'+n.name+
                           '</p>'+
                           '<p>组织代码：'+n._id+
                           '</p>'+
                           '<p>组织密码：'+n.password+
                           '</p>';
                return $li.html(html).data('doc',n);
            });
        },
        joinOrgHtml:function(list){
            return $.map(list,function(n){
                var $li = $('<li>'),
                    html = '<p>组织代码：'+n.org+
                           '</p>';
                return $li.html(html).data('doc',n);
            });
        },
        joinOrg:function(){
            var self = this,
                data = {};
                
            data._id = +$('#join-org-code').val();
            data.password = $('#join-org-password').val();
                
            $.docsajax({
                url:'/joinOrg',
                data:data,
                method:'post',
                success:function(d){
                    $.prompt({
                        type:'success',
                        content:'你已成功加入组织'
                    });
                    self.tabCons.$joinOrgs.find("ul").append(self.joinOrgHtml([d]));
                }
            });
        },
        createOrg:function(){
            var self = this,
                data = {};
                
            data.name = $('#org-name').val();
            data.password = $('#org-password').val();
                
            $.docsajax({
                url:'/createOrg',
                data:data,
                method:'post',
                success:function(d){
                    $.prompt({
                        type:'success',
                        title:'你已成功创建组织：',
                        content:data.name
                    });
                    self.tabCons.$myOrgs.find("ul").append(self.myOrgsHtml([d]));
                }
            });
        },
        bindEvent:function(){
            var $tabCons = $('.item-list'),
                $tabs = $('.nav-tabs li'),
                self = this;
            $('.nav-tabs').on('click','li',function(){
                var i = $(this).index();
                $tabCons.addClass('hidden')
                    .eq(i).removeClass('hidden');
                $tabs.removeClass('active')
                    .eq(i).addClass('active');
            });
            
            //删除文档
            self.tabCons.$allDocs.on("click",".del-item",function(){
                var $li = $(this).closest("li"),
                    doc = $li.data("doc");
                
                $.docsajax({
                    url:"/delDoc",
                    data:doc,
                    method:"post",
                    success:function(d){
                        $li.remove();
                        $.prompt({
                            type:"success",
                            content:"删除成功"
                        });
                    }
                });
            });
            
            //添加组织
            self.tabCons.$myOrgs.find('.create-org-btn,.cancel-btn').click(function(){
                self.tabCons.$myOrgs.find('.create-org-box,.create-org-btn').toggleClass('hidden');
            });
            
            //提交组织
            self.tabCons.$myOrgs.find('.submit-btn').click(function(){
                self.createOrg();
            });
            
            //加入组织
            self.tabCons.$joinOrgs.find('.join-org-btn,.cancel-btn').click(function(){
                self.tabCons.$joinOrgs.find('.join-org-box,.join-org-btn').toggleClass('hidden');
            });
            
            //提交加入组织
            self.tabCons.$joinOrgs.find('.submit-btn').click(function(){
                self.joinOrg();
            });
        },
        init:function(){
            this._init();
            this.bindEvent();
        }
    };
    
    Account.init();
})();
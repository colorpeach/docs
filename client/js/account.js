(function(){
    var Account = {
        $allDocs:$('#all-docs'),
        $allRepos:$('#all-repos'),
        $myOrgs:$('#my-orgs'),
        $joinOrgs:$('#join-orgs'),
        orgList:[],
        state:{
            nowTab:$('#all-docs'),
            showDetail:function(bl,$li,title){
                var $detail = $('.detail-box');
                
                this.nowTab.find('li.active').removeClass('active');
                if(!bl){
                    $detail.addClass('hidden');
                }else{
                    $detail.find("ul").html("");
                    $detail.find(".detail-header").html(title||"设置");
                    $detail.removeClass('hidden');
                    $li.addClass('active');
                }
            }
        },
        _init:function(){
            var self = this;
           url.repos && $.ajax({
                url:url.repos,
                method:'get',
                success:function(d){
                    self.$allRepos.html(self.reposHtml(d));
                }
            });
            
            $.docsajax({
                url:"/getDoc",
                method:'post',
                wrap:self.$allDocs,
                success:function(d){
                    self.$allDocs.html(self.docHtml(d.docs));
                }
            });
            
            $.docsajax({
                url:"/getOrgs",
                method:'post',
                success:function(d){
                    self.$myOrgs.find("ul").append(self.myOrgsHtml(d.orgs));
                    self.myOrgList = d.orgs;
                }
            });
            
            $.docsajax({
                url:"/getJoinOrgs",
                method:'post',
                success:function(d){
                    self.$joinOrgs.find("ul").append(self.joinOrgHtml(d.orgs));
                    self.joinOrgList = d.orgs;
                }
            });
        },
        docHtml:function(list){
            return $.map(list,function(n){
                var $li = $("<li>"),
                    html = '<a href="'+n.user+'/'+n.title+'">'+n.title+'</a>'+
                            '<div class="pull-right opera-box">'+
                            '<a href="/edit?user='+n.user+'&_id='+n._id+'" data-tip="编辑">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+
                            '</a>'+
                            '<a href="javascript:;" class="del-item" data-tip="删除">'+
                                '<span class="glyphicon glyphicon-remove"></span>'+
                            '</a>'+
                            '<a href="javascript:;" class="share-item" data-tip="分享">'+
                                '<span class="glyphicon glyphicon-share-alt">'+
                            '</a>'+
                            '</div>';
                return $li.html(html).data('doc',n);
            });
        },
        shareOrgHtml:function(){
            return $.map(this.myOrgList.concat(this.joinOrgList),function(n){
                var $li = $('<li>'),
                    html =  '<span class="glyphicon glyphicon-unchecked glyphicon-check fn-check"></span>'+
                            n.name;
                return $li.html(html).data('org',n);
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
                           ' <a href="javascript:;" class="member-item" data-tip="成员列表">'+
                           '<span class="glyphicon glyphicon-list-alt"></span>'+
                           '</a>'+
                           '</p>'+
                           '<p>组织代码：'+n._id+
                           '</p>'+
                           '<span>组织密码：'+n.password+
                           '</span>';
                return $li.html(html).data('org',n);
            });
        },
        joinOrgHtml:function(list){
            return $.map(list,function(n){
                var $li = $('<li>'),
                    html = '<p>组织名称：'+n.name+
                           ' <a href="javascript:;" class="member-item" data-tip="成员列表">'+
                           '<span class="glyphicon glyphicon-list-alt"></span>'+
                           '</a>'+
                           '</p>'+
                           '<p>组织代码：'+n._id+
                           '</p>'+
                           '<span>组织密码：'+n.password+
                           '</span>';
                return $li.html(html).data('org',n);
            });
        },
        joinOrg:function(){
            var self = this,
                data = self.$joinOrgs.find('.join-org-box').inputBox('data',{valid:true,skip:true});;
                
            if(!data)
                return;
                
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
                    self.$joinOrgs.find("ul").append(self.joinOrgHtml([d]));
                    self.$joinOrgs.find('.cancel-btn').click();
                }
            });
        },
        createOrg:function(){
            var self = this,
                data = self.$myOrgs.find('.create-org-box').inputBox('data',{valid:true,skip:true});
                
            if(!data)
                return;
                
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
                    self.$myOrgs.find("ul").append(self.myOrgsHtml([d]));
                    self.$myOrgs.find('.cancel-btn').click();
                }
            });
        },
        docLinkOrg:function(data,$this,fn){
            var self = this,
                data = data;
            
            $.docsajax({
                url:'/docLinkOrg',
                data:data,
                method:'post',
                wrap:$this.closest('li'),
                cover:false,
                loading:'...',
                success:function(d){
                    $.prompt({
                        type:'success',
                        content:data.link ? '你已成功分享文档' : '你已成功取消分享文档'
                    });
                    fn && fn(d);
                }
            });
        },
        membersHtml:function(list){
            return $.map(list||[],function(n){
                return '<li>'+n.user+'</li>';
            });
        },
        getMembers:function(org){
            var self = this;
            
            $.docsajax({
                url:'/getMembers',
                data:{_id:org._id},
                method:'post',
                wrap:$('.detail-box'),
                success:function(d){
                    d.members.unshift({user:org.owner});
                    $('.detail-box ul').html(self.membersHtml(d.members));
                }
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
            
            //删除文档
            self.$allDocs
            .on("click",".del-item",function(){
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
            })
            .on('click','.share-item',function(){
                self.state.showDetail(true,$(this).closest('li'),"分享给组织：");
                $('.detail-box ul').html(self.shareOrgHtml());
            });
            
            //添加组织
            self.$myOrgs.find('.create-org-btn,.cancel-btn').click(function(){
                self.state.showDetail(false);
                self.$myOrgs.find('.create-org-box,.create-org-btn').toggleClass('hidden');
                self.$myOrgs.find('.create-org-box').inputBox('clear');
            });
            
            //提交组织
            self.$myOrgs.find('.submit-btn').click(function(){
                self.createOrg();
            });
            
            //加入组织
            self.$joinOrgs.find('.join-org-btn,.cancel-btn').click(function(){
                self.state.showDetail(false);
                self.$joinOrgs.find('.join-org-box,.join-org-btn').toggleClass('hidden');
                self.$joinOrgs.find('.join-org-box').inputBox('clear');
            });
            
            //提交加入组织
            self.$joinOrgs.find('.submit-btn').click(function(){
                self.joinOrg();
            });
            
            //成员列表
            $tabCons.on('click','.member-item',function(){
                var $li = $(this).closest('li'),
                    data = $li.data('org');
                    
                self.state.showDetail(true,$li,"成员列表");
                self.getMembers(data);
            });
            
            $('.close-btn').click(function(){
                self.state.showDetail(false);
            });
            
            $('.detail-box').on('click','.fn-check',function(){
                var $this = $(this),
                    org = $this.closest('li').data('org')._id,
                    doc = self.$allDocs.find('li.active').data('doc')._id,
                    link = $this.hasClass('glyphicon-unchecked');
                
                self.docLinkOrg({org:org,doc:doc,link:link},$this,function(){
                    $this[link ? 'removeClass' : 'addClass']('glyphicon-unchecked');
                });
            });
        },
        init:function(){
            this._init();
            this.bindEvent();
        }
    };
    
    Account.init();
})();
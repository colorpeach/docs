(function(){
    var Account = {
        $allDocs:$('#all-docs'),
        $allDecks:$('#all-decks'),
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
                url:"/get/user/docs",
                wrap:self.$allDocs.find('ul'),
                success:function(d){
                    self.$allDocs.find('ul').html(self.docHtml(d.docs));
                }
            });
            
            $.docsajax({
                url:"/get/user/decks",
                wrap:self.$allDocs.find('ul'),
                success:function(d){
                    self.$allDecks.find('ul').html(self.docHtml(d.decks,'slide'));
                }
            });
            
            $.docsajax({
                url:"/get/user/orgs",
                success:function(d){
                    var createOrgs = [],joinOrgs;
                    
                    joinOrgs = $.map(d.orgs,function(n){
                        if(n.owner !== user){
                            return n;
                        }else{
                            createOrgs.push(n);
                        }
                    });
                    
                    self.$myOrgs.find("ul").append(self.myOrgsHtml(createOrgs));
                    self.myOrgList = createOrgs;
                    self.$joinOrgs.find("ul").append(self.joinOrgHtml(joinOrgs));
                    self.joinOrgList = joinOrgs;
                }
            });
        },
        docHtml:function(list,type){
            var type = type || 'doc',
                edit = type === 'doc' ? 'edit' : 'deck';
            return $.map(list,function(n){
                var $li = $("<li>"),
                    html = '<a href="/'+type+'/'+n.user+'/'+n.title+'">'+n.title+'</a>'+
                            '<div class="opera-box">'+
                            '<a href="/'+edit+'?_id='+n._id+'" data-tip="编辑">'+
                                '<span class="icon-pencil"></span>'+
                            '</a>'+
                            '<a href="javascript:;" class="del-item" data-tip="删除">'+
                                '<span class="icon-remove"></span>'+
                            '</a>'+
                            (n.auth === 'public' ?
                            '<a href="javascript:;" class="private-item" data-tip="取消公开">'+
                                '<span class="icon-lock">'+
                            '</a>'
                            :
                            '<a href="javascript:;" class="share-item" data-tip="分享">'+
                                '<span class="icon-share">'+
                            '</a>')+
                            '</div>';
                return $li.html(html).data(type,n);
            });
        },
        shareOrgHtml:function(orgs){
            var orgs = $.map(orgs,function(n){return n._id;});
            return $.map(this.myOrgList.concat(this.joinOrgList),function(n){
                var $li = $('<li>'),
                    html =  '<span class="'+
                             ($.inArray(""+n._id,orgs) >=0 ? '' : 'icon-checkbox-unchecked') +
                            ' icon-checkbox-checked fn-check"></span>'+
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
                           '</p>'+
                           '<p>组织代码：'+n.code+
                           '</p>'+
                           '<span>组织密码：'+n.password+
                           '</span>'+
                           '<div class="opera-box">'+
                           ' <a href="javascript:;" class="member-item" data-tip="成员列表">'+
                           '<span class="icon-users"></span>'+
                           '</a>'+
                           '</div>';
                return $li.html(html).data('org',n);
            });
        },
        joinOrgHtml:function(list){
            return $.map(list,function(n){
                var $li = $('<li>'),
                    html = '<p>组织名称：'+n.name+
                           ' <a href="javascript:;" class="member-item" data-tip="成员列表">'+
                           '<span class="icon-users"></span>'+
                           '</a>'+
                           '</p>'+
                           '<p>组织代码：'+n.code+
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
                
            $.docsajax({
                url:'/post/org/add/user',
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
                url:'/post/create/org',
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
                url = '/post/org/add/doc',
                data = data;
                
            if(!data.link){
                url = '/post/org/del/doc';
            }
            
            $.docsajax({
                url:url,
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
        privateDoc:function($this,type){
            var data = $this.closest('li').data(type === 'deck' ? 'slide' : "doc");
            
            data = {
                _id:data._id,
                auth:"private"
            };
            
            $.docsajax({
                url:type === 'deck' ? '/post/update/deck' : '/post/update/doc',
                method:'post',
                data:data,
                wrap:$this.closest('li'),
                cover:false,
                success:function(d){
                    $.prompt({
                        type:'success',
                        content:'操作成功'
                    });
                    $this.closest('li')
                    .find('.private-item')
                    .data('tip','分享')
                    .removeClass('private-item')
                    .addClass('share-item')
                    .find('span')
                    .removeClass('icon-lock')
                    .addClass('icon-share')
                }
            });
        },
        membersHtml:function(list){
            return $.map(list||[],function(n){
                return '<li><a href="/account/'+n.login+'">'+n.login+'</a></li>';
            });
        },
        getMembers:function(org){
            var self = this;
            
            $.docsajax({
                url:'/get/org/users',
                data:{org:org._id},
                wrap:$('.detail-box'),
                success:function(d){
                    $('.detail-box ul').html(self.membersHtml(d.members));
                }
            });
        },
        bindEvent:function(){
                var $tabCons = $('.item-list'),
                $tabs = $('.slide-tabs li'),
                self = this;

            $('.info-edit').on('click',function(){
                var $tabCons = $('.item-list');
                for(var i=0;i<$(this).parents('.account-left').find('.slide-tabs').children().length;i++){
                    $(this).parents('.account-left').find('.slide-tabs').children().eq(i).removeClass('active');
                }
                $tabCons.addClass('hidden');
                $(".edit-img").removeClass('hidden');

            }),
           
            $('.submit-img').click(function(){
                var data = $(".edit-img").inputBox('data');

                $.docsajax({
                    url:'/post/photo/save/img',
                    method:'post',
                    data:data,
                    dataType:'formData',
                    success:function(d){
                        location.href = '/account/'+user;
                    }
                })
            })
           
            $('.slide-tabs').on('click','li',function(){
                var i = $(this).index();

                if(!$(".edit-img").hasClass('hidden')){
                    $(".edit-img").addClass('hidden');
                }

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
                
                $.msg({
                    type:'danger',
                    msg:'删除的文档将无法恢复，确认删除？',
                    ok:function(){
                        $.docsajax({
                            url:"/post/del/doc",
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
                    }
                });
            })
            .on('click','.share-item',function(){
                var $li = $(this).closest('li');
                self.state.showDetail(true,$li,"分享给组织：");
                
                $.docsajax({
                    url:'/get/doc/orgs',
                    data:{doc:$li.data('doc')._id},
                    wrap:$('.detail-box'),
                    success:function(d){
                        $('.detail-box ul').html(self.shareOrgHtml(d.orgs));
                    }
                });
            })
            .on('click','.private-item',function(){
                self.privateDoc($(this));
            });
            
            //删除幻灯片
            self.$allDecks
            .on("click",".del-item",function(){
                var $li = $(this).closest("li"),
                    doc = $li.data("doc");
                
                $.msg({
                    type:'danger',
                    msg:'删除的幻灯片将无法恢复，确认删除？',
                    ok:function(){
                        $.docsajax({
                            url:"/post/del/deck",
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
                    }
                });
            })
            .on('click','.share-item',function(){
                var $li = $(this).closest('li');
                self.state.showDetail(true,$li,"分享给组织：");
                
                $.docsajax({
                    url:'/get/deck/orgs',
                    data:{doc:$li.data('slide')._id},
                    wrap:$('.detail-box'),
                    success:function(d){
                        $('.detail-box ul').html(self.shareOrgHtml(d.orgs));
                    }
                });
            })
            .on('click','.private-item',function(){
                self.privateDoc($(this),'deck');
            });
            
            //添加组织
            self.$myOrgs.find('.create-org-btn,.cancel-btn').click(function(){
                self.state.showDetail(false);
                self.$myOrgs.find('.create-org-box,.create-org-btn').toggleClass('hidden');
                self.$myOrgs.find('.create-org-box').inputBox('clear').inputBox('focus');
            });
            
            //提交组织
            self.$myOrgs.find('.submit-btn').click(function(){
                self.createOrg();
            });
            
            //加入组织
            self.$joinOrgs.find('.join-org-btn,.cancel-btn').click(function(){
                self.state.showDetail(false);
                self.$joinOrgs.find('.join-org-box,.join-org-btn').toggleClass('hidden');
                self.$joinOrgs.find('.join-org-box').inputBox('clear').inputBox('focus');
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
                    link = $this.hasClass('icon-checkbox-unchecked');
                
                self.docLinkOrg({org:org,doc:doc,link:link},$this,function(){
                    $this[link ? 'removeClass' : 'addClass']('icon-checkbox-unchecked');
                });
            });
            
            self.$myOrgs.find('.create-org-box').inputBox({button:".submit-btn"});
            self.$joinOrgs.find('.join-org-box').inputBox({button:".submit-btn"});
        },
        init:function(){
            this._init();
            this.bindEvent();
        }
    };
    
    Account.init();
})();

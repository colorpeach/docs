(function(){
    var Modifypassword = {
        bindEvent:function(){
            $('#edit-btn').click(function(){
                var data = $('.edit-con').inputBox('data',{valid:true});
                if(!data)
                    return false;

                if(data.newpassword != data.newpassword2){
                    $.msg('两次输入的密码不一致');
                    return false;
                }
                if(data.newpassword == data.oldpassword){
                    $.msg('新旧密码不能相同');
                    return false;
                }
                var data2 = {
                    "oldpassword":data.oldpassword,
                    "newpassword":data.newpassword,
                    "username":data.username
                }
                $.docsajax({
                    url:'/post/user/editpwd',
                    method:'post',
                    data:data2,
                    block:'请求仍在进行...',
                    success:function(d){
                        if(d){
                            setTimeout(function(){location.href = '/account/'+user},1000);
                        }
                    }
                });
            });

            $('.cancer-btn').click(function(){
                    location.href = '/account/'+user;
            })
        },
        init:function(){
            this.bindEvent();
        }
    };
    Modifypassword.init();
})();

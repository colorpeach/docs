(function(){
    //登陆
    $('#login-btn').click(function(){
        var data = $('.login-con').inputBox('data',{valid:true});
        
        if(!data)
            return false;
        
        $.docsajax({
            url:'/login',
            method:'post',
            data:JSON.stringify(data),
            contentType:'application/json',
            success:function(d){
                location.href = "/";
            }
        });
    });
    
    //注册
    $('#reg-btn').click(function(){
        var data = $('.reg-con').inputBox('data',{valid:true});
        
        if(!data)
            return false;
        
        if(data.password !== data.confirmPassword){
            $.msg("两次输入密码不一致");
            return;
        }
        
        delete data.confirmPassword;
        
        $.docsajax({
            url:'/register',
            method:'post',
            data:JSON.stringify(data),
            contentType:'application/json',
            success:function(d){
                location.href = "/";
            }
        });
    });
    
    $('.login-link').click(function(){
        $('.reg-con').addClass('hidden');
        $('.login-con').removeClass('hidden');
        return false;
    });
    
    $('.reg-link').click(function(){
        $('.login-con').addClass('hidden');
        $('.reg-con').removeClass('hidden');
        return false;
    });
    
    $('.login-con').inputBox({button:$('#login-btn')});
    $('.reg-con').inputBox({button:$('#reg-btn')});
})();
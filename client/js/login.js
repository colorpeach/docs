(function(){
    //登陆
    $('#login-btn').click(function(){
        var data = {
            password:$('#password').val(),
            username:$('#username').val()
        };
        
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
        var data = {
            password:$('#reg-password').val(),
            username:$('#reg-username').val()
        };
        
        if(data.password !== $("#confirm-password").val()){
            $.msg("两次输入密码不一致");
            return;
        }
        
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
})();
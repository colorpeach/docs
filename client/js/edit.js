(function(){
    
    var editor;
    var timer;
    
    try{
        editor = ace.edit('editor');
    }catch(e){
        $.prompt({
            type:'danger',
            content:'载入编辑器失败，请刷新页面重试'
        });
    }
    
    var Edit = {
        $view:$('#view'),
        $title:$('#title'),
        converter:new Showdown.converter(),
        toView:function(con){
            this.$view.html(this.converter.makeHtml(con));
        },
        generateFileLink:function(){
            if(doc._id){
                $('.file-btn').removeClass('hidden').attr('href','/'+doc.user+'/'+doc.title);
            }
        },
        save:function(){
            var data = {
                title:this.$title.val(),
                content:editor.getValue(),
                auth:$('.auth-btn').hasClass('active') ? 'private' : 'public'
            };
            
            if(doc._id){
                data._id = doc._id;
            }
            
            $.docsajax({
                url:'/saveDoc',
                method:'post',
                data:JSON.stringify(data),
                contentType:'application/json',
                success:function(d){
                    doc.title = d.doc.title;
                    if(!doc._id){
                        doc._id = d.doc._id;
                        Edit.generateFileLink();
                    }
                    $.prompt({
                        type:'success',
                        content:'保存成功'
                    });
                }
            });
        }
    };
    
    editor.setTheme('ace/theme/chrome');
    editor.getSession().setMode('ace/mode/markdown');
    editor.setAutoScrollEditorIntoView(true);
    
    editor.on('change',function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            Edit.toView(editor.getValue());
        },300);
    });
    
    //权限设置
    $('.auth-btn').click(function(){
        $(this).toggleClass('active');
    });
    
    //预览
    $('.view-btn').click(function(){
        $(this).toggleClass('active');
        $('.edit-left,.edit-right').toggleClass('view');
    });
    
    $('.save-btn').click(function(){
        Edit.save();
    });
    
    Edit.generateFileLink();
    
    editor.setValue($('#content').val());
})();
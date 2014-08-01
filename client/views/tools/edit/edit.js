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
            this.$view.html(this.converter.makeHtml(con).escapeHTML());
        },
        generateFileLink:function(){
            if(doc._id){
                $('.file-btn').removeClass('hidden').attr('href','/doc/'+doc.user+'/'+doc.title);
            }
        },
        save:function(){
            var data = $('.edit-box').inputBox('data'),
                url = '/post/add/doc';
                
            if(!data){
                return;
            }
                
            data.content = editor.getValue();
            data.auth = $('.auth-btn').hasClass('active') ? 'private' : 'public';
            
            if(doc._id){
                data._id = doc._id;
                url = '/post/update/doc';
            }
            
            $.docsajax({
                url:url,
                method:'post',
                data:data,
                success:function(d){
                    doc.title = d.doc.title;
                    if(!doc._id){
                        doc._id = d.doc._id;
                        Edit.generateFileLink();
                        if(history.replaceState){
                            history.replaceState(null,null,'?_id='+doc._id);
                        }
                    }
                    $('#content').val(editor.getValue());
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
        var err = $('.edit-box').inputBox('valid');
        
        if(err.length)
            return;
            
        if(editor.getValue() === ''){
            $.prompt({
                type:'warning',
                content:'请输入文档内容'
            });
            return;
        }
        
        Edit.save();
    });

    $('.cancer-btn').click(function(){
        var err = $('.edit-box').inputBox('valid'),
            preContent = $('#content').val();

        if(err.length)
            return;

        if(editor.getValue() != preContent){
            $.msg({
                    type:'confirm',
                    msg:'文档尚未保存，是否保存并返回？',
                    ok:function(){
                        Edit.save();
                        location.href = '/account/'+doc.user;
                    },
                    cancer:function(){
                        location.href = '/account/'+doc.user;
                    }
                }
            )
        }else{
            location.href = '/account/'+doc.user;
        }

    })

    Edit.generateFileLink();
    
    editor.setValue($('#content').val());
})();

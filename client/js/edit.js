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
        $preview:$('#preview'),
        converter:new Showdown.converter(),
        toView:function(con){
            this.$view.html(this.converter.makeHtml(con));
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
            
            html2canvas(this.$preview.parent(), {
              onrendered: function(canvas) {
                data.thumbnail = canvas.toDataURL();
            
                $.docsajax({
                    url:url,
                    method:'post',
                    data:data,
                    success:function(d){
                        doc.title = d.doc.title;
                        Edit.$preview.modal('close');
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
        Edit.$preview.modal('open');
        Edit.$preview.find('.preview-con').html(Edit.$view.html());
    });
    
    Edit.$preview.modal({
        width:900,
        height:600,
        title:'预览',
        button:[
            {
                text:'提交',
                type:'primary',
                click:function(){
                    Edit.save();
                }
            }
        ]
    });
    
    Edit.generateFileLink();
    
    editor.setValue($('#content').val());
})();

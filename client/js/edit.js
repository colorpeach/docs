(function(){
    
    var editor = ace.edit("editor");
    var timer;
    
    var Edit = {
        $view:$("#view"),
        $title:$("#title"),
        converter:new Showdown.converter(),
        toView:function(con){
            this.$view.html(this.converter.makeHtml(con));
        },
        save:function(){
            var data = {
                title:this.$title.val(),
                content:editor.getValue()
            };
            
            if(doc._id){
                data._id = doc._id;
            }
            
            $.ajax({
                url:'/addDoc',
                method:'post',
                data:JSON.stringify(data),
                contentType:'application/json',
                success:function(d){
                    console.log(d);
                }
            });
        }
    };
    
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/markdown");
    editor.setAutoScrollEditorIntoView(true);
    
    editor.on("change",function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            Edit.toView(editor.getValue());
        },300);
    });
    
    $(".save-btn").click(function(){
        Edit.save();
    });
    
    editor.setValue($("#content").val());
})();
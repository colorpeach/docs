var content = document.querySelector('textarea').value;
content && (document.querySelector('#deck').innerHTML = content);

Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: false,

    theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
    transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

    // Parallax scrolling
    // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
    // parallaxBackgroundSize: '2100px 900px',

    // Optional libraries used to extend on reveal.js
    dependencies: [
        { src: '/lib/reveal/2.6.2/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: '/lib/reveal/2.6.2/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '/lib/reveal/2.6.2/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: '/lib/reveal/2.6.2/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        { src: '/lib/reveal/2.6.2/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
        { src: '/lib/reveal/2.6.2/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
    ]
});

(function(){
    var colorBtns = [
        {
            "value": "none",
            "style": "background:none;width:40px;height:34px;",
            "icon" : "icon-blocked"
        },
        {
            "value": "rgba( 200, 50, 30, .6)",
            "style": "background:rgba( 200, 50, 30 ,.6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 50, 200, 90, .4)",
            "style": "background:rgba( 50, 200, 90, .4);width:40px;height:34px;"
        },
        {
            "value": "rgba( 0, 0, 0, .6)",
            "style": "background:rgba( 0, 0, 0, .6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 255, 255, 255, .6)",
            "style": "background:rgba( 255, 255, 255, .6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 22, 152, 213, .6)",
            "style": "background:rgba( 22, 152, 213, .6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 22, 213, 75, .6)",
            "style": "background:rgba( 22, 213, 75, .6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 12, 25, 77, .6)",
            "style": "background:rgba( 12, 25, 77, .6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 180, 50, 140, .6)",
            "style": "background:rgba( 180, 50, 140, .6);width:40px;height:34px;"
        },
        {
            "value": "rgba( 255, 122, 0, .6)",
            "style": "background:rgba( 255, 122, 0, .6);width:40px;height:34px;"
        }
    ];
    
    var topBtns = [
            {
                "icon": "icon-undo",
                "action": "",
                "value": "undo",
                "tip": "撤销"
            },
            {
                "icon": "icon-redo",
                "action": "",
                "value": "redo",
                "tip": "重做"
            },
            {
                "icon": "icon-bold",
                "action": "",
                "value": "bold",
                "tip": "加粗"
            },
            {
                "icon": "icon-italic",
                "action": "",
                "value": "italic",
                "tip": "斜体"
            },
            {
                "icon": "icon-underline",
                "action": "",
                "value": "underline",
                "tip": "下划线"
            },
            {
                "icon": "icon-paragraph-center2",
                "action": "",
                "value": "",
                "buttons":[
                    {
                        "icon": "icon-paragraph-left2",
                        "action": "",
                        "value": "justifyleft",
                        "tip": "左对齐"
                    },
                    {
                        "icon": "icon-paragraph-center2",
                        "action": "",
                        "value": "justifycenter",
                        "tip": "居中"
                    },
                    {
                        "icon": "icon-paragraph-right2",
                        "action": "",
                        "value": "justifyright",
                        "tip": "右对齐"
                    },
                    {
                        "icon": "icon-paragraph-justify2",
                        "action": "",
                        "value": "justifyfull",
                        "tip": "分散对齐"
                    }
                ]
            },
            {
                "icon": "icon-list",
                "action": "",
                "value": "insertunorderedlist",
                "tip": "无序列表"
            },
            {
                "icon": "icon-numbered-list",
                "action": "",
                "value": "insertorderedlist",
                "tip": "有序列表"
            },
            {
                "icon": "icon-embed",
                "action": "",
                "value": "formatBlock",
                "buttons-dir" : "v-box",
                "buttons":[
                    {
                        "text": "Paragraph",
                        "action": "",
                        "value": "p"
                    },
                    {
                        "text": "pre",
                        "action": "",
                        "value": "pre"
                    },
                    {
                        "text": "code",
                        "action": "",
                        "value": "code"
                    },
                    {
                        "text": "heading1",
                        "action": "",
                        "value": "h1"
                    },
                    {
                        "text": "heading2",
                        "action": "",
                        "value": "h2"
                    },
                    {
                        "text": "heading3",
                        "action": "",
                        "value": "h3"
                    }
                ]
            },
            {
                "icon": "icon-font",
                "action": "",
                "value": "fontSize",
                "buttons-dir" : "v-box",
                "buttons":[
                    {
                        "text": "18px",
                        "action": "",
                        "value": "1"
                    },
                    {
                        "text": "24px",
                        "action": "",
                        "value": "2"
                    },
                    {
                        "text": "32px",
                        "action": "",
                        "value": "3"
                    },
                    {
                        "text": "42px",
                        "action": "",
                        "value": "4"
                    },
                    {
                        "text": "54px",
                        "action": "",
                        "value": "5"
                    },
                    {
                        "text": "72px",
                        "action": "",
                        "value": "6"
                    },
                    {
                        "text": "112px",
                        "action": "",
                        "value": "7"
                    }
                ]
            },
            {
                "icon": "icon-droplet",
                "action": "",
                "value": "forecolor",
                "tip": "字体颜色",
                "buttons-dir" : "v-box",
                "buttons" : colorBtns
            },
            {
                "icon": "icon-droplet",
                "action": "",
                "value": "backcolor",
                "tip": "字体背景色",
                "buttons-dir" : "v-box",
                "buttons" : colorBtns
            },
            {
                "icon": "icon-link",
                "action": "createLink",
                "value": "",
                "tip": "链接"
            },
            {
                "icon": "icon-link",
                "action": "",
                "value": "unlink",
                "tip": "取消链接"
            },
            {
                "icon": "icon-image",
                "action": "insertImage",
                "value": "",
                "tip": "图片"
            },
            {
                "icon": "icon-paint-format",
                "action": "",
                "value": "removeFormat",
                "tip": "清除样式"
            }
        ];
        
    var rightBtns = [
            {
                "icon": "icon-remove2",
                "action": "delete",
                "value": "",
                "tip": "删除当前片段"
            },
            {
                "icon": "icon-droplet",
                "action": "setBackgroundColor",
                "value": "",
                "tip": "背景颜色",
                "buttons" : colorBtns
            },
            {
                "icon": "icon-image2",
                "action": "setBackground",
                "value": "",
                "tip": "背景图"
            },
            {
                "icon": "icon-plus",
                "action": "",
                "value": "",
                "tip": "设置fragment"
            },
            {
                "icon": "icon-pushpin",
                "action": "position",
                "value": "",
                "tip": "定位"
            },
            {
                "icon": "icon-code",
                "action": "editHtml",
                "value": "",
                "tip": "编辑html"
            }
        ];
    
    var topbarAction = {
        createLink:function($this){
            var $box = $('#link-box');
                
            if(document.getSelection().type !== 'Range'){
                $.prompt({
                    type:'warning',
                    content:'请选中需要添加链接的文字'
                });
                return;
            }
            
            document.execCommand('createlink',false,'createLink');
            
            $.fixed($this,$box);
            $box.fadeIn();
            $box.inputBox('focus');
            
            $(document).on('mousedown.link-box',function(e){
                if(!$.contains($box[0],e.target)){
                    var $a = $('a[href=createLink]');
                    $a.each(function(i,n){
                        $(n.childNodes).unwrap();
                    });
                    $(document).off('mousedown.link-box');
                    $box.fadeOut();
                }
            });
        },
        insertImage:function($this){
            var $box = $('#img-box');
                
            if(document.getSelection().type === 'None'){
                $.prompt({
                    type:'warning',
                    content:'请指定插入图片的地方'
                });
                return;
            }
            
            document.execCommand('insertimage',false,'insertimage');
            
            $.fixed($this,$box);
            $box.fadeIn();
            $box.inputBox('focus');
            
            $(document).on('mousedown.img-box',function(e){
                if(!$.contains($box[0],e.target)){
                    var $img = $('img[src=insertimage]');
                    $img.remove();
                    $(document).off('mousedown.img-box');
                    $box.fadeOut();
                }
            });
        }
    };
    
    var rightbarAction = {
        'delete':function(){
            if($('section').length === 1)
                return;
                
            $.msg({
                type:'danger',
                msg:'确认删除当前片段？',
                ok:function(){
                    var $present = $('section.present'),
                        slideType = 'prev';
                    
                    if(Reveal.isFirstSlide()){
                        slideType = 'next';
                    }
                    
                    if($present.length > 2 && $present.filter('.stack').children().length === 1){
                        $present.remove();
                    }else{
                        $present.not('.stack').remove();
                    }
                    Reveal.sync();
                    Reveal[slideType]();
                }
            });
        },
        editHtml:function(){
            var html = $('section.present:not(.stack)').html();
            hljs.highlightBlock($('#html-box').modal('open').find('textarea').val(html)[0]);
        },
        setBackground:function($this){
            var $box = $('#background-box');
            
            $.fixed($this,$box,{dir:'l',x:-50});
            $box.fadeIn();
            $box.inputBox('focus');
            
            $(document).on('mousedown.background-box',function(e){
                if(!$.contains($box[0],e.target)){
                    $(document).off('mousedown.background-box');
                    $box.fadeOut();
                }
            });
        },
        setBackgroundColor:function($this){
            var val = $this.data('value');
            
            if(val){
                $('section.present:not(.stack)').attr('data-background-color',val);
                Reveal.sync();
            }
        },
        position:function(){
            $('#deck,#topbar,#rightbar,.add-slide,.add-fragment').addClass('preview');
            $('#prompt-box').addClass('editing');
        }
    };
    
    var Deck = {
        $reveal:$('.reveal'),
        $slidebar:$('#slidebar'),
        $topbar:$('#topbar'),
        $rightbar:$('#rightbar'),
        bindEvent:function(){
            var self = this,
                $slides = self.$reveal.find('.slides');
                
            $('.add-slide').click(function(){
                $slides.find('>section.present').after(template(true));
                Reveal.sync();
                Reveal.right();
            });
            
            $('.add-fragment').click(function(){
                var $section = $slides.find('section.present').eq(0);
                
                if($section.hasClass('stack')){
                    $section.find('.present').after(template(true));
                }else if($section.parent().hasClass('stack')){
                    $section.after(template(true));
                }else{
                    $section.children().wrap(template());
                    $section.append(template(true));
                    $section.addClass('present');
                }
                Reveal.sync();
                Reveal.down();
            });
            
            //保存
            $('.save-btn').click(function(){
                $('#save-box').modal('open').inputBox('focus');
            });
            
            //个人中心
            $('.account-btn').click(function(){
                var $box = $('#account-box');
                
                $.fixed($(this),$box,{dir:'t',x:84});
                $box.fadeIn();
            
                $(document).on('mousedown.account-box',function(e){
                    if(!$.contains($box[0],e.target)){
                        $(document).off('mousedown.account-box');
                        $box.fadeOut();
                    }
                });
            });
            
            $('#save-box').modal({
                width:300,
                title:'保存',
                button:[
                    {
                        text:'提交',
                        type:'primary',
                        click:function(){
                            var data = $('#save-box').inputBox('data',{valid:true}),
                                url = '/post/add/deck';
                            
                            if(!data) return;
                
                            data.content = $('#deck').clone().find('section').removeAttr('contenteditable').end().html();
                            data._id && (url = 'post/update/deck');
                            
                            $.docsajax({
                                url:url,
                                method:'post',
                                data:data,
                                success:function(){
                                    $.prompt({
                                        type:'success',
                                        content:'保存成功'
                                    });
                                    $('#save-box').modal('close');
                                }
                            });
                        }
                    }
                ]
            });
            
            //预览
            $('.preview-btn').click(function(){
                $('#deck,#slidebar,#topbar,#rightbar,.add-fragment,.add-slide').addClass('preview');
                $('#deck').find('section').removeAttr('contenteditable');
                setTimeout('Reveal.layout()',300);
            });
            
            //编辑
            $('.edit-btn').click(function(){
                $('#deck,#slidebar,#topbar,#rightbar,.add-fragment,.add-slide').removeClass('preview');
                $('#deck').find('section').prop('contenteditable',true);
                setTimeout('Reveal.layout()',300);
            });
            
            //添加链接
            $('#link-box').inputBox({button:$('.add-link-btn')});
            $('.add-link-btn').mousedown(function(e){
                e.preventDefault();
            }).click(function(){
                var data = $('#link-box').inputBox('data',{valid:true});
                
                if(!data) return;
                
                $('a[href=createLink]').attr('href',data.link);
                $(document).trigger('mousedown.link-box');
            });
            
            //添加图片
            $('#img-box').inputBox({button:$('.add-img-btn')});
            $('.add-img-btn').mousedown(function(e){
                e.preventDefault();
            }).click(function(){
                var data = $('#img-box').inputBox('data',{valid:true});
                
                if(!data) return;
                
                $('img[src=insertimage]').attr('src',data.img);
                $(document).trigger('mousedown.img-box');
            });
            
            //(定位，设置fragment)操作完毕
            $('.opera-btn').click(function(){
                $('#deck,#topbar,#rightbar,.add-slide,.add-fragment').removeClass('preview');
            $('#prompt-box').removeClass('editing');
            });
        },
        initSlideDetail:function(){
            var self = this,
                $slideDetail = $('.slide-detail'),
                $document = $(document);
            
            self.$slidebar.find('.slide-con').on('click','.btn',function(){
                var index = $(this).index();
                $slideDetail.filter('.active').animate({left:'-100%'},function(){
                    $(this).removeClass('active');
                });
                $slideDetail.eq(index).addClass('active').animate({left:150});
            });
            
            $document.on('mousedown',function(){
                $slideDetail.filter('.active').animate({left:'-100%'},function(){
                    $(this).removeClass('active');
                });
            });
        },
        initTopbar:function(){
            var self = this;
            
            self.$topbar.on('mousedown','.btn',function(e){
                e.preventDefault();
            });
            
            self.$topbar.on('click','.btn',function(e){
                var $this = $(this);
                var action = $this.data('action');
                var val = $this.data('value');
                
                if(action in topbarAction)
                    topbarAction[action]($this);
                else if(val)
                    if(val === 'none')
                        val = none;
                    if($this.parent().hasClass('btn-wrap-box') && $this.parent().prev().data('value'))
                        document.execCommand($this.parent().prev().data('value'),false,val);
                    else
                        document.execCommand(val);
                    
                return false;
            });
            
            //生成顶部工具栏按钮
            self.$topbar.find('.btn-group').html(
                $.map(topBtns,function(n){
                    var $btn = $('<button>',{class:'btn'});
                    
                    $btn.attr('data-tip',n.tip).data(n).append($('<span>').addClass(n.icon));
                    
                    if(n.buttons){
                        $btn.attr('data-alignment','l');
                        $btn = $('<span class="btn-wrap">').append($btn)
                        .append($('<div class="btn-wrap-box">').append(
                                $.map(n.buttons,function(m){
                                    var $btn = $('<button>',{class:'btn'});
                                    $btn.attr('data-tip',m.tip).data(m);
                                    m.style && $btn.attr('style',m.style);
                                    if(m.icon)
                                        $btn.append($('<span>').addClass(m.icon));
                                    else
                                        $btn.text(m.text);
                                    return $btn;
                                })
                            )
                        );
                        
                        if(n['buttons-dir']){
                            $btn.find('.btn-wrap-box').addClass(n['buttons-dir']);
                        }
                    }
                    return $btn;
                })
            );
        },
        initRightbar:function(){
            var self = this;
            
            self.$rightbar.on('mousedown','.btn',function(e){
                e.preventDefault();
            });
            
            self.$rightbar.on('click','.btn',function(e){
                var $this = $(this),
                    value = $this.data('value'),
                    action = $this.data('action');
                    
                if(value && $this.parent().hasClass('btn-wrap-box'))
                    action = $this.parent().prev().data('action');
                
                if(action in rightbarAction)
                    rightbarAction[action]($this);
            });
            
            self.$rightbar.find('.btn-group').html(
                $.map(rightBtns,function(n){
                    var $btn = $('<button>',{class:'btn'});
                    
                    $btn.attr('data-tip',n.tip).data(n).append($('<span>').addClass(n.icon));
                    n.buttons || $btn.attr('data-alignment','l');
                    
                    if(n.buttons){
                        $btn = $('<span class="btn-wrap">').append($btn)
                        .append($('<div class="btn-wrap-box">').append(
                                $.map(n.buttons,function(m){
                                    var $btn = $('<button>',{class:'btn'});
                                    $btn.attr('data-tip',m.tip).data(m);
                                    m.style && $btn.attr('style',m.style);
                                    if(m.icon)
                                        $btn.append($('<span>').addClass(m.icon));
                                    else
                                        $btn.text(m.text);
                                    return $btn;
                                })
                            )
                        );
                        
                        if(n['buttons-dir']){
                            $btn.find('.btn-wrap-box').addClass(n['buttons-dir']);
                        }
                    }
                    return $btn;
                })
            );
            
            //编辑html初始化
            self.$rightbar.find('.btn-group >.btn:last-child').one('click',function(){
//                 hljs.highlight();
                $('#html-box').modal({
                    width:600,
                    height:400,
                    title:'编辑html',
                    button:[
                        {
                            text:'确定',
                            type:'primary',
                            click:function(){
                                var html = $('#html-box textarea').val();
                                $('section.present:not(.stack)').html(html);
                                $('#html-box').modal('close');
                            }
                        }
                    ]
                })
            });
        },
        init:function(){
            this.initSlideDetail();
            this.initTopbar();
            this.initRightbar();
            this.bindEvent();
            $('section').prop('contenteditable',true);
        }
    };
    
    Deck.init();
    
    function template(content){
        return [
                '<section contenteditable="true" class="future">',
                content ? '<h2>title</h2>' : '',
                '</section>'
               ].join('');
    }
})();

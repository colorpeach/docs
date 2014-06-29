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
            "value": "rgb( 200, 50, 30)",
            "style": "background:rgb( 200, 50, 30);width:40px;height:34px;"
        },
        {
            "value": "rgb( 50, 200, 90)",
            "style": "background:rgb( 50, 200, 90);width:40px;height:34px;"
        },
        {
            "value": "rgb( 0, 0, 0)",
            "style": "background:rgb( 0, 0, 0);width:40px;height:34px;"
        },
        {
            "value": "rgb( 255, 255, 255)",
            "style": "background:rgb( 255, 255, 255);width:40px;height:34px;"
        },
        {
            "value": "rgb( 22, 152, 213)",
            "style": "background:rgb( 22, 152, 213);width:40px;height:34px;"
        },
        {
            "value": "rgb( 22, 213, 75)",
            "style": "background:rgb( 22, 213, 75);width:40px;height:34px;"
        },
        {
            "value": "rgb( 12, 25, 77)",
            "style": "background:rgb( 12, 25, 77);width:40px;height:34px;"
        },
        {
            "value": "rgb( 180, 50, 140)",
            "style": "background:rgb( 180, 50, 140);width:40px;height:34px;"
        },
        {
            "value": "rgb( 255, 122, 0)",
            "style": "background:rgb( 255, 122, 0);width:40px;height:34px;"
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
                "action": "",
                "value": "",
                "tip": "背景颜色",
                "buttons" : colorBtns
            },
            {
                "icon": "icon-image2",
                "action": "",
                "value": "",
                "tip": "背景图"
            },
            {
                "icon": "icon-plus",
                "action": "",
                "value": "",
                "tip": "添加slide"
            },
            {
                "icon": "icon-pushpin",
                "action": "",
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
            var offset = $this[0].getBoundingClientRect(),
                $box = $('#link-box');
                
            if(document.getSelection().type !== 'Range'){
                $.prompt({
                    type:'warning',
                    content:'请选中需要添加链接的文字'
                });
                return;
            }
            
            $box.css({
                top:offset.bottom+10,
                left:offset.left-$box.width()/2-10+(offset.right-offset.left)/2
            })
            .fadeIn();
            
            $(document).on('mousedown.link-box',function(e){
                if(!$.contains($box[0],e.target)){
                    $(document).off('mousedown.link-box');
                    $box.fadeOut();
                }
            });
        },
        insertImage:function($this){
            var offset = $this[0].getBoundingClientRect(),
                $box = $('#img-box');
            
            $box.css({
                top:offset.bottom+10,
                left:offset.left-$box.width()/2-10+(offset.right-offset.left)/2
            })
            .fadeIn();
            
            $(document).on('mousedown.img-box',function(e){
                if(!$.contains($box[0],e.target)){
                    $(document).off('mousedown.img-box');
                    $box.fadeOut();
                }
            });
        }
    };
    
    var rightbarAction = {
        'delete':function(){
            $.msg({
                type:'danger',
                msg:'确认删除当前片段？',
                ok:function(){
                    
                }
            });
        },
        editHtml:function(){
            var html = $('section.present:not(.stack)').html();
            $('#html-box').modal('open').find('textarea').val(html);
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
                Reveal.down();
            });
            
            //保存
            $('.save-btn').click(function(){
                var data = {};
                
                data.content = $('#deck').find('section').prop('contenteditable',false).end().html();
                data.title = "标题";
                
                $.docsajax({
                    url:'/post/add/deck',
                    method:'post',
                    data:data,
                    success:function(){
                        $.prompt({
                            type:'success',
                            content:'新增成功'
                        });
                    }
                });
            });
            
            //预览
            $('.preview-btn').click(function(){
                $('#deck,#slidebar,#topbar,#rightbar,.add-fragment,.add-slide').addClass('preview');
                $('#deck').find('section').removeAttr('contenteditable');
                $(window).resize();
            });
            
            //编辑
            $('.edit-btn').click(function(){
                $('#deck,#slidebar,#topbar,#rightbar,.add-fragment,.add-slide').removeClass('preview');
                $('#deck').find('section').prop('contenteditable',true);
                $(window).resize();
            });
            
            //添加链接
            $('#link-box').inputBox({button:$('.add-link-btn')});
            $('.add-link-btn').mousedown(function(e){
                e.preventDefault();
            }).click(function(){
                var data = $('#link-box').inputBox('data',{valid:true});
                
                if(!data) return;
                
                document.execCommand('createLink',null,data.link);
                $(document).trigger('mousedown.link-box');
            });
            
            //添加图片
            $('#img-box').inputBox({button:$('.add-img-btn')});
            $('.add-img-btn').mousedown(function(e){
                e.preventDefault();
            }).click(function(){
                var data = $('#img-box').inputBox('data',{valid:true});
                
                if(!data) return;
                
                document.execCommand('insertimage',null,data.img);
                $(document).trigger('mousedown.img-box');
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
            
            self.$rightbar.on('click','.btn',function(){
                var action = $(this).data('action');
                
                if(action in rightbarAction)
                    rightbarAction[action]($(this));
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

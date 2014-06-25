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
                        "value": "",
                        "tip": "左对齐"
                    },
                    {
                        "icon": "icon-paragraph-center2",
                        "action": "",
                        "value": "",
                        "tip": "居中"
                    },
                    {
                        "icon": "icon-paragraph-right2",
                        "action": "",
                        "value": "",
                        "tip": "右对齐"
                    },
                    {
                        "icon": "icon-paragraph-justify2",
                        "action": "",
                        "value": "",
                        "tip": "分散对齐"
                    }
                ]
            },
            {
                "icon": "icon-list",
                "action": "",
                "value": "",
                "tip": "无序列表"
            },
            {
                "icon": "icon-numbered-list",
                "action": "",
                "value": "",
                "tip": "有序列表"
            },
            {
                "icon": "icon-embed",
                "action": "",
                "value": "formatBlock",
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
                "value": "",
                "tip": "字体颜色"
            },
            {
                "icon": "icon-droplet",
                "action": "",
                "value": "",
                "tip": "字体背景色"
            },
            {
                "icon": "icon-link",
                "action": "createLink",
                "value": "createLink",
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
                "action": "",
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
                "tip": "背景颜色"
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
                "action": "",
                "value": "",
                "tip": "编辑html"
            }
        ];
    
    var topbarAction = {
        createLink:function(){
            
        }
    };
    
    var rightbarAction = {
        'delete':function(){
            $.msg({
                type:'danger',
                msg:'确认删除当前片段？'
            });
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
            
            self.$topbar.on('click','.btn',function(){
                var $this = $(this);
                var action = $this.data('action');
                var val = $this.data('value');
                
                if(action in topbarAction)
                    topbarAction[action]($this);
                else if(val)
                    if($this.parent().hasClass('btn-wrap-box'))
                        document.execCommand($this.parent().prev().data('value'),false,val);
                    else
                        document.execCommand(val);
                    
                return false;
            });
            
            self.$topbar.find('.btn-group').html(
                $.map(topBtns,function(n){
                    var $btn = $('<button>',{class:'btn'});
                    
                    $btn.attr('data-tip',n.tip).data(n).append($('<span>').addClass(n.icon));
                    
                    if(n.buttons){
                        $btn = $('<span class="btn-wrap">').append($btn)
                        .append($('<div class="btn-wrap-box">').append(
                                $.map(n.buttons,function(m){
                                    var $btn = $('<button>',{class:'btn'});
                                    $btn.attr('data-tip',m.tip).data(m);
                                    if(m.icon)
                                        $btn.append($('<span>').addClass(m.icon));
                                    else
                                        $btn.text(m.text);
                                    return $btn;
                                })
                            )
                        );
                    }
                    return $btn;
                })
            );
        },
        initRightbar:function(){
            var self = this;
            
            self.$rightbar.on('click','.btn',function(){
                var action = $(this).data('action');
                
                if(action in rightbarAction)
                    rightbarAction[action]($(this));
            });
            
            self.$rightbar.find('.btn-group').html(
                $.map(rightBtns,function(n){
                    var $btn = $('<button>',{class:'btn'});
                    n.alignment = 'l';
                    $btn.attr('data-tip',n.tip).data(n).append($('<span>').addClass(n.icon));
                    return $btn;
                })
            );
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

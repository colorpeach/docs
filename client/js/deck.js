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
    var topbarAction = {
        
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
            
            $('.save-btn').click(function(){
                var data = {};
                
                data.content = $('#deck').find('section').prop('contenteditable',false).end().html();
                data.title = "标题";
                
                $.docsajax({
                    url:'/post/add/deck',
                    method:'post',
                    data:data,
                    success:function(){
                        $.msg('新增成功');
                    }
                });
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
                var action = $(this).data('action');
                
                if(action in topbarAction)
                    topbarAction[action]($(this));
            });
        },
        initRightbar:function(){
            var self = this;
            
            self.$rightbar.on('click','.btn',function(){
                var action = $(this).data('action');
                
                if(action in rightbarAction)
                    rightbarAction[action]($(this));
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

(function(){
    $.prompt = (function(){
        var template = function(obj){
                var className = "alert-success";
                switch(obj.type){
                    case "info":
                        className = "alert-info";
                        break;
                    case "warning":
                        className = "alert-warning";
                        break;
                    case "danger":
                        className = "alert-danger";
                        break;
                }
                
                return "<div>" +
                        "<div class='alert "+className+" animate-enter' ng-animate=\"'animate'\">"+
                            "<strong>"+(obj.title||"")+"</strong>"+obj.content+
                        "</div>" +
                        "</div>";
            },
            queue = [],
            queueCount = 0,
            showQueue = [],
            boxTimeout,
            addSpan = 2000,
            removeSpan = 3000,
            max = 2,
            action = function(){
                var hasQueue = queue.length,
                    opt;

                opt = queue.shift();
                hasQueue && queueCount++;
                
                if(opt){
                    var $item = $(template(opt));
                    box.append($item);
                    
                    hasQueue && setTimeout(function(){
                        action();
                    },addSpan);
                    
                    showQueue.push(setTimeout(function(){
                        $item.addClass('animate-leave');
                        setTimeout(function(){
                            $item.remove();
                        },600);
                        showQueue.shift();
                        if(!showQueue.length){
                            boxTimeout = setTimeout(function(){box.hide();boxTimeout=null;},600);
                        }
                    },removeSpan));
                }else{
                    return;
                }
            },
            box = $("<div class='prompt-box'></div>"),
            prompt = function(options){
                if(!$(".prompt-box").length){
                    $("body").append(box);
                }
                
                if(!queue.length){
                    if(boxTimeout){
                        clearTimeout(boxTimeout);
                        boxTimeout = null;
                    }else{
                        box.show();
                    }
                    queue.push(options);
                    action();
                }else{
                    queue.push(options);
                }
            };
        
        prompt.clear = function(){
            queue = [];
            while(showQueue.length){
                clearTimeout(showQueue.unshift());
            }
        };
            
        return prompt;
    })();
    
    //tip
    var $tip = $('<div class="cm-tip hidden">');
    $tip.html(
        '<div class="cm-tip-arrow"></div>'+
        '<div class="cm-tip-content"></div>'
    );
    $('body').append($tip).on({
        mouseenter:function(){
            var $this = $(this),
                tip = $this.data('tip'),
                offset = $this[0].getBoundingClientRect();
            $tip.removeClass('hidden');
            $tip.find('.cm-tip-content').text(tip)
            .end().css({
                left:offset.left-$tip.width()/2+offset.width/2,
                top:offset.bottom+6
            });
        },
        mouseleave:function(){
            $tip.addClass('hidden');
        }
    },'[data-tip]')
    .find('[title]').each(function(i,n){
        $(n).attr('data-tip',$(n).attr('title'));
        $(n).removeAttr('title');
    });
    
    //滚动悬浮导航栏
    $(document).scroll(function(){
        $('.topnav')[$(window).scrollTop()>72 ? 'addClass':'removeClass']('fixed');
    });
})();
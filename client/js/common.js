(function(){
    /**
    *@name jQuery.prompt
    *@param {Object}
    */
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
                        "<div class='alert "+className+" animate-enter'>"+
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
                data = $this.data();
                
            $tip.removeClass('hidden');
            $tip.find('.cm-tip-content').text(data.tip)
            
            if(data.alignment === 'l'){
                $.fixed($this,$tip,{dir:'l'});
                $tip.find('.cm-tip-arrow').addClass('cm-tip-arrow-left');
            }else{
                $.fixed($this,$tip);
                $tip.find('.cm-tip-arrow').removeClass('cm-tip-arrow-left');
            }
        },
        mouseleave:function(){
            $tip.addClass('hidden');
        }
    },'[data-tip]');
})();

(function(){
    /**
    *@name fixed
    *@param target
    *@param attachment
    *@param dir
    */
    $.fixed = function(target,attachment,options){
        var $this = $(target),
            offset = $this[0].getBoundingClientRect(),
            $tip = $(attachment),
            arrowGap = 6;
            css = {},
            opts = {
                dir:'b',
                x:0,
                y:0
            };
            
        $.extend(opts,options);
            
        switch(opts.dir){
            case 'l':
                css = {
                    left:offset.left-$tip.width()-arrowGap,
                    top:offset.top-$tip.height()/2+(offset.bottom-offset.top)/2
                };
                break;
            case 'r':
                css = {
                    left:offset.right+$tip.width()+arrowGap,
                    top:offset.top-$tip.height()/2+(offset.bottom-offset.top)/2
                };
                break;
            case 't':
                css = {
                    left:offset.left-$tip.width()/2+(offset.right-offset.left)/2,
                    top:offset.top-arrowGap
                };
                break;
            default:
                css = {
                    left:offset.left-$tip.width()/2+(offset.right-offset.left)/2,
                    top:offset.bottom+arrowGap
                };
                break;
        }
        
        css.left += +opts.x||0;
        css.top += +opts.y||0;
        
        $tip.css(css);
    };
})();

(function(){
    var circleTimer;
    $('body').on("click", function(e){
        var x = e.pageX;
        var y = e.pageY;
        var $this = $(this);
        var r = 50;

        if(circleTimer){
            clearTimeout(circleTimer);
        }
        
        circleTimer = setTimeout(function(){
            var $svg = $('<svg class="circle-effect"><circle fill="rgba(0,0,0,.1)" cx="'+r+'" cy="'+r+'" r="'+0+'"></circle>');
            $svg.css({top:y-r,left:x-r});
            $this.append($svg);
    
            var c = $svg.find("circle");
            c.animate(
                {
                    "r" : r
                },
                {
                    duration: 400,
                    step : function(val){
                        c.attr("r", val);
                        c.attr("fill",'rgba(0,0,0,'+(50-val)*3/500+')');
                    },
                    done:function(){
                        $svg.remove();
                    }
                }
            );
            
        },150);
    });
})();

(function(){
    /**
    *@name docsajax
    *@param loading {string} 'loading...'
    *@param wrap {Dom}
    *@param cover {boolean}
    *@param fail {function}
    *@param block {boolean|string}
    */
    var uid = 0;
    var pending = {};
    var block = {};
    var queue = {};
    var pendingMsg = '加载中...';
    
    $.ajaxSetup({
        timeout:40000
    });
    
    $.docsajax = function(opts){
        var success,error;
        
        if(opts.success){
            opts._success = opts.success;
            delete opts.success;
        }
        
        if(opts.error){
            opts._error = opts.error;
            delete opts.error;
        }
        
        if(opts.block && addBlock(opts) === false){
            return;
        }
        
        if(opts.dataType === 'formData'){
            opts.data = generateFormdata(opts.data);
            opts.processData = false;
            opts.contentType = false;
            delete opts.dataType;
        }
        
        var promise = $.ajax(opts);
        
        addMark(opts);

        promise.then(function(d,type,promise){
            var d = JSON.parse(d);
            
            removeReload(opts);
            removeMark(opts);
            removeBlock(opts);
            
            if(d.error){
                opts.fail && opts.fail(d,promise);
                $.prompt({
                    type:'warning',
                    content:$.map(d.errorMsg,function(n){return '<p>'+n+'</p>';})
                });
            }else{
                if(d.successMsg){
                    $.prompt({
                        content: $.map(d.successMsg,function(n){return '<p>'+n+'</p>';})
                    })
                }
                opts._success && opts._success(d,promise);
            }
        });
        
        promise.error(function(promise,type,content){
            if(promise.status === 401){
                location.href = '/login';
            }else if(type === 'timeout'){
                addReload(opts);
            }else if(promise.status !== 0 || type !== 'error'){
                removeReload(opts);
                removeMark(opts);
                $.prompt({
                    type:'danger',
                    title:'错误：',
                    content:content
                });
            }
            
            removeBlock(opts);
            
            opts._error && opts._error(arguments);
        });
    };
    
    //add loading
    function addMark(opts){
        var $wrap = $('<span>');
        
        if(opts.wrap || opts.loading || opts.cover){
            $wrap.html(opts.loading ? opts.loading : pendingMsg)
            
            if(opts.wrap && opts.cover){
                opts.wrap.append($wrap);
            }else{
                (opts.wrap || $('body')).append($wrap = $('<div class="cover">').append($wrap));
            }
            
            opts.$wrap = $wrap;
            pending[opts.mark = ++uid] = $wrap;
        }
    };
    
    //remove loading
    function removeMark(opts){
        if(opts.mark in pending){
            pending[opts.mark].remove();
            delete pending[opts.mark];
        }
    }
    
    //cancel request if last request don't response
    function addBlock(opts){
        if(opts.block){
            var blockMark = opts.url+'|'+opts.method;
            if(blockMark in block){
                if(typeof opts.block === 'string'){
                    $.prompt({
                        type:"warning",
                        content:opts.block
                    });
                }
                return false;
            }else{
                block[blockMark] = opts.block;
            }
        }
    }
    
    //last request has responsed, remove block
    function removeBlock(opts){
        if(opts.block){
            var blockMark = opts.url+'|'+opts.method;
            if(blockMark in block){
                delete block[blockMark];
            }
        }
    }
    
    //add reload div
    function addReload(opts){
        var $wrap = opts.$wrap,
            $reload = '请求超时，<a href="javascript:;" class="reload">重试</a>';
        
        if($wrap){
            if($wrap.is('.cover')){
                $wrap.children().html($reload);
            }else{
                $wrap.html($reload);
            }

            //user can reload when request timeout
            $wrap.find('.reload')
            .data('opts',opts)
            .on('click',function(){
                var opts = $(this).data('opts');

                removeReload(opts);
                $.docsajax(opts);

                return false;
            });
        }
    }
    
    //remove reload div
    function removeReload(opts){
        var $wrap = opts.$wrap;
        
        if($wrap){
            opts.$wrap = null;
            $wrap.find('.reload').off().removeData('opts');
            $wrap.remove();
        }
    }
    
    //generate formdata
    function generateFormdata(data,formData,prefix,isArray){
        if(!formData){
            formData = new FormData();
        }
        
        for (var key in data) {
			var subData = data[key];
			var name = isArray ? prefix + '[' + key + ']' : (prefix ? prefix + '.' + key : key);
			if ($.isArray(subData)) {
				generateFormdata(subData, formData, name, true);
			} else {
				if ($.isPlainObject(subData)) {
					generateFormdata(subData, formData, name);
				} else {
					formData.append(name, subData === null || subData === undefined ? '' : subData);
				}
			}
		}
		
		return formData;
    }
})();

(function(){
    /**
    *@name jQuery.inputBox
    *@param {Object}
    *@return {Object}
    */
    var matchRegexp = /^(\/[\s\S]+\/)(?::|$)/;
    
    $.fn.inputBox = function(method,arg){
        var $this = $(this);
        $this.each(function(_,n){
            var $n = $(n),
                obj = $n.data('inputBox');
                
            if(!obj){
                obj = new InputBox($n,method);
                $n.data('inputBox',obj);
            }
            
            result = obj._handler(method,arg);
            
            if(result != undefined){
                return false;
            }
        });
        
        return result == undefined ? $this : result;
    };
    
    function InputBox(el,method){
        this._defaultValidator = {
            required:{
                msg:'请填写必填项',
                expression:'_ !==""'
            },
            number:{
                msg:'只能填写数字',
                expression:'$.isNumeric(_)'
            }
        };
        this.$el = el;
        this._validator = {};
        
        this._init(method||{});
        this._parseValidator();
    }
    
    InputBox.prototype = {
        constructor:InputBox,
        _handler:function(method,arg){
            if($.isPlainObject(method)){
                for(var n in method){
                    this[n] && this[n](method[n]);
                }
            }else if(typeof method === "string" && method[0] !== "_"){
                if(method in this)
                    return this[method](arg);
            }
        },
        _init:function(opts){
            //extend default validators
            if($.isPlainObject(opts.validator)){
                $.extend(this._defaultValidator,opts.validator);
            }
        },
        _parseValidator:function(){
            var $ipts = this.$el.find('input[data-validator]'),
                self = this;
            
            $ipts.each(function(i,n){
                var $ipt = $(n),
                    valids = $ipt.data('validator').split(', '),
                    name = $ipt.attr('name') || $ipt.attr('id'),
                    code = '';
                    
                name && $.each(valids,function(_,m){
                    code += self._generateVlidator(m,name);
                });
                
                if(code){
                    code += ' return {pass:true};';
                    self._validator[name] = new Function('_','_p',code);
                }
            });
        },
        _generateVlidator:function(m,name){
            var self = this;
            var valid = m.split(':'),
                expression = valid[0],
                msg = valid[1],
                code = '';
            
            if(matchRegexp.test(m)){
                //regexp
                expression = matchRegexp.exec(m)[1];
                msg = m.replace(expression,'').slice(1);
//                 expression = expression.replace("\\","\\\\");
                
                code += 'if(!('+expression+'.test(_)))';
                
            }else if(expression in self._defaultValidator){
                if(!msg)
                    msg = self._defaultValidator[expression].msg || '';
                    
                expression = self._defaultValidator[expression].expression;
                
                if(matchRegexp.test(expression)){
                    code += 'if(!('+expression+'.test(_)))';
                }else{
                    //base type
                    code += 'if(!('+expression+'))';
                }
            }else{
                //operator
                code += 'if(!('+expression+'))';
            }
            code += '{ return {pass:false,field:"'+name+'",msg:"'+(msg||'')+'"};}';
            
            return code;
        },
        _errorHandler:function handler(result){
            var $ipt = this.$el.find('[name='+result.field+'],[id='+result.field+']').eq(0);
            $ipt.addClass('error');
            this._errorPrompt(result);
        },
        _errorPrompt:function(result){
            $.prompt({
                type:'warning',
                content:result.msg
            });
        },
        _submitBind:function(){
            var self = this;
            self.$el.off('keydown.inputBox');
            self.$el.on('keydown.inputBox','input,textarea,select',function(e){
                if(e.keyCode === 13){
                    var $this = $(this),
                        $ipt = self.$el.find('input:enabled,textarea:enabled,select:enabled');
                    
                    if($this.is($ipt.filter(":last"))){
                        self._submitButton.click();
                    }else{
                        $ipt.eq($ipt.index($this)+1).focus();
                    }
                }
            });
        },
        button:function(val){
            this._submitButton = typeof val === 'string' ? this.$el.find(val) : val;
            this._submitBind();
        },
        focus:function(){
            this.$el.find('input:enabled:visible,textarea:enabled:visible,select:enabled:visible').eq(0).focus();
        },
        clear:function(){
            this.$el.find('input,textarea,select').removeClass('error').val('');
        },
        destroy:function(){
            
        },
        errorHandler:function(val){
            //error handler
            if($.isFunction(val)){
                this._errorPrompt = val;
            }
        },
        valid:dataOrValid('valid'),
        data:dataOrValid('data')
    };
    
    function dataOrValid(type){
        return function(opts){
            var data = {},
                self = this,
                results = [],
                opts = opts || {};
            
            this.$el.find('input,textarea,select').each(function(i,n){
                var $n = $(n),
                    val,
                    name = $n.attr('name') || $n.attr('id'),
                    result;
                    
                $n.removeClass('error');
                if(name){
                    type !== 'valid' && (val = data[name] = getData($n));
                    //get the validator
                    if((type === 'valid' || opts.valid) && name in self._validator){
                        result = self._validator[name](val,data);
                        //error
                        if(!result.pass){
                            results.push(result);
                            self._errorHandler(result);
                            //catch error,skip right now
                            if(opts.skip)
                                return false;
                        }
                    }
                }
            });
            
            return type ==='valid' ? results : results.length ? false : data;
        };
    }
    
    function getData($el){
        var type = $el[0].tagName === 'INPUT' && $el.attr('type');
        
        switch(type){
            case 'file':
                return $el[0].files[0];
            default:
                return $.trim($el.val()).escapeHTML();
        }
    }
})();

(function(){
    /*
    *@name modal
    */
    
    $.fn.modal = function(method,arg){
        var $this = $(this),
            result;
            
        $this.each(function(_,n){
            var $n = $(n),
                obj = $n.data('modal');
                
            if(!obj){
                obj = new Modal($n,method);
                $n.data('modal',obj);
            }
            
            result = obj._handler(method,arg);
            
            if(result != undefined){
                return false;
            }
        });
        
        return result == undefined ? $this : result;
    };
    
    function Modal(el,method){
        this.opts = {
            title:"",
            button:[],
            onClose:$.noop,
            onOpen:$.noop,
            onDestory:$.noop
        };
        this.$el = el;
        this._init($.extend(this.opts,method));
    }
    
    Modal.prototype = {
        constructor:Modal,
        _handler:function(method,arg){
            if($.isPlainObject(method)){
                for(var n in method){
                    this[n] && this[n](method[n]);
                }
            }else if(typeof method === "string" && method[0] !== "_"){
                if(method in this)
                    return this[method](arg);
            }
        },
        _init:function(opts){
            var $modal = modal(opts),
                self = this;
            
            this.$modal = $modal;
            $modal.find('.cm-modal-body').append(this.$el.show());
            $modal
            .on('click','.cm-modal-close',function(){
                self.close();
            })
            .on('mousedown',function(e){
                if(this === e.target)
                    self.close();
            });
            
            $modal.find('.cm-modal-foot').html(
                $.map(opts.button.length ? opts.button : [{text:'取消',className:'cm-modal-close'}],function(n){
                    var type = n.type ? 'btn-'+n.type : 'btn-default';
                    var className = n.className || '';
                    var $button = $('<button class="btn '+type+' '+className+'">'+n.text+'</button>');
                    if(n.click)
                        $button.click(n.click);
                    return $button;
                })
            );
            
            $('body').append($modal);
        },
        type:function(val){
            this.$modal.find('.cm-modal-head').removeClass('bg-success bg-info bg-warning bg-danger').addClass('bg-'+val);
        },
        destroy:function(){
            this.$el.removeData('modal');
            this.$modal.remove();
            this.opts.onDestory();
        },
        open:function(){
            var self = this;
            this.$modal.fadeIn().find('.cm-modal').animate({top:0},'swing',function(){
                self.opts.onOpen();
            });
            $('html,body').addClass('cm-modal-overflow-hidden');
        },
        close:function(){
            var self = this;
            this.$modal.fadeOut().find('.cm-modal').animate({top:'-100%'},'swing',function(){
                self.opts.onClose();
                $('html,body').removeClass('cm-modal-overflow-hidden');
            });
        },
        width:function(val){
            this.$modal.find('.cm-modal').css('width',val);
        },
        height:function(val){
            this.$modal.find('.cm-modal').css('height',val);
            this.$modal.find('.cm-modal-body').css('height',val-97);
        }
    };
    
    function modal(opts){
        var html =  '<div class="cm-modal-box">'+
                        '<div class="cm-modal border">'+
                            '<div class="cm-modal-head">'+
                                '<h3>'+opts.title+'</h3>'+
                                '<span class="icon-close cm-modal-close"></span>'+
                            '</div>'+
                            '<div class="cm-modal-body"></div>'+
                            '<div class="cm-modal-foot"></div>'+
                        '</div>'+
                    '</div>';
        return $(html);
    }
})();

(function(){
    /*
    *@require $.fn.modal
    *@name msg
    *@param msg {Object|string}
    *       msg.ok      a callback when click confirm button
    *       msg.cancel  a callback when click cancel button
    *       msg.msg     prompt's msg
    *       msg.type    prompt's type
    *       msg.title   prompt's title
    */
    
    $.msg = function(msg){
        var $p = $('<p>'),
            settings = {
                width:450,
                type:'info',
                title:'提示',
                button:[
                    {
                        text:'关闭',
                        click:function(){
                            $p.modal('close');
                        }
                    }
                ],
                onClose:function(){
                    $p.modal('destroy');
                }
            };
        
        if($.isPlainObject(msg)){
            switch(msg.type){
                case 'warning':
                case 'alert':
                    $.extend(settings,{
                        type:'warning'
                    });
                    break;
                case 'danger':
                case 'confirm':
                    $.extend(settings,{
                        button:[
                            {
                                text:'确定',
                                type:msg.type === 'danger'?'danger':'primary',
                                click:function(){
                                    msg.ok && msg.ok();
                                    $p.modal('close');
                                }
                            },
                            {
                                text:'取消',
                                click:function(){
                                    $p.modal('close');
                                }
                            }
                        ]
                    },
                    msg.type === 'danger' ? {
                        type:'danger',
                        title:'警告'
                    } : {
                        type:'info',
                        title:'确认'
                    });
                    break;
                case 'success':
                    $.extend(settings,{
                        type:'success'
                    });
                    break;
            }
            
            if(msg.title)
                settings.title = msg.title;
            
            $p.html(msg.msg).modal(settings);
            $p.modal('open');
        }else if(typeof msg === 'string'){
            $p.html(msg).modal(settings);
            $p.modal('open');
        }
    };
})();


String.prototype.escapeHTML = function () {
    return this.replace(/<(\/?script.*?)>/g,'&lt;$1&gt;');
};

$("#add-item").click(function(){
    var $box = $("#add-box");
            
    $.fixed($(this),$box,{x:-17});
    $box.fadeIn();
    
    $(document).on('mousedown.add-box',function(e){
        if(!$.contains($box[0],e.target)){
            $(document).off('mousedown.add-box');
            $box.fadeOut();
        }
    });
});
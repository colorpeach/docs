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
    
    $.msg = function(msg){
        alert(msg);
    };
    
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
    
    //退出登录
    $('#logout').click(function(){
        $.ajax({
            url:'/logout',
            method:'post',
            success:function(d){
                location.reload();
            }
        });
        return false;
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
        timeout:10000
    });
    
    $.docsajax = function(opts){
        var success,error;
        
        if(opts.success){
            success = opts.success;
            delete opts.success;
        }
        
        if(opts.error){
            error = opts.error;
            delete opts.error;
        }
        
        if(opts.block && addBlock(opts) === false){
            return;
        }
        
        var promise = $.ajax(opts);
        
        addMark(opts);

        promise.then(function(d){
            var d = JSON.parse(d);
            
            removeReload(opts);
            removeMark(opts);
            removeBlock(opts);
            
            if(d.error){
                opts.fail && opts.fail(d);
                $.prompt({
                    type:'warning',
                    content:$.map(d.errorMsg,function(n){return '<p>'+n+'</p>';})
                });
            }else{
                success && success(d);
            }
        });
        
        promise.error(function(promise,type,content){
            if(type === 'timeout'){
                addReload(opts);
            }else{
                removeReload(opts);
                removeMark(opts);
                $.prompt({
                    type:'danger',
                    title:'错误：',
                    content:content
                });
            }
            
            removeBlock(opts);
            
            error && error(arguments);
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
})();

(function(){
    /**
    *@name jQuery.inputBox
    *@param {Object}
    *@return {Object}
    */
    $.fn.inputBox = function(method,arg){
        var $this = $(this);
        $this.each(function(_,n){
            var $n = $(n),
                obj = $n.data('inputBox');
                
            if(!obj){
                obj = new InputBox($n);
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
        this._parseValidator();
        this._matchRegexp = /^(\/[\s\S]+\/)(?::|$)/;
        
        this._init();
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
        _init:function(){
            
        },
        _parseValidator:function(){
            var $ipts = this.$el.find('input[data-validator]'),
                self = this;
            
            $ipts.each(function(i,n){
                var $ipt = $(n),
                    valids = $ipt.data('validator').split(','),
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
            
            //regexp
//             if(self._matchRegexp.test()){
                
//             }
            
            //base type
            if(expression in self._defaultValidator){
                code += 'if(!('+self._defaultValidator[expression].expression+'))';
                if(!msg)
                    msg = self._defaultValidator[expression].msg || '';
                code += '{ return {pass:false,field:"'+name+'",msg:"'+msg+'"};}';
            }else{
                //operator
                code += 'if(!('+expression+'))';
                code += '{ return {pass:false,field:"'+name+'",msg:"'+(msg||'')+'"};}';
            }
            
            return code;
        },
        _errorHandler:function handler(result){
            var $ipt = this.$el.find('[name='+result.field+'],[id='+result.field+']').eq(0);
            $ipt.addClass('error');
            $.prompt({
                type:'warning',
                content:result.msg
            });
        },
        _submitBind:function(){
            var self = this;
            self.$el.off('keydown.inputBox');
            self.$el.on('keydown.inputBox','input,textarea',function(e){
                if(e.keyCode === 13){
                    var $this = $(this),
                        $ipt = self.$el.find('input:enabled,textarea:enabled');
                    
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
            this.$el.find('input:enabled,textarea:enabled').eq(0).focus();
        },
        valid:dataOrValid('valid'),
        data:dataOrValid('data'),
        clear:function(){
            this.$el.find('input,textarea').removeClass('error').val('');
        },
        destroy:function(){
            
        },
        config:function(opts){
            //extend default validators
            if($.isPlainObject(opts.validator)){
                $.extend(this._defaultValidator,opts.validator);
            }
            //error handler
            if($.isFunction(opts.handler)){
                this._errorHandler = opts.handler;
            }
        }
    };
    
    function dataOrValid(type){
        return function(opts){
            var data = {},
                self = this,
                results = [],
                opts = opts || {};
            
            this.$el.find('input').each(function(i,n){
                var $n = $(n),
                    val = $.trim($n.val()),
                    name = $n.attr('name') || $n.attr('id'),
                    result;
                    
                $n.removeClass('error');
                if(name){
                    type !== 'valid' && (data[name] = val);
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
})();

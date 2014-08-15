define(['angular'],function(angular){
    angular.module('tools',[])

    .constant('config',{
        docprefix:/^[^\/]+\/\*!\s*/,
        docsuffix:/\s*\*\/[^\/]+$/,
//         docN:/\s*\n\s*/g,
    })
    
    //拦截器
    .factory('responseinterceptor',
    ['$q','prompt',
        function($q,prompt){
            return function(promise){
                return promise.then(
                    function success(d){
                        if(d.data.error){
                             prompt({
                                type:'warning',
                                content:d.errorMsg.map(function(n){return '<p>'+n+'</p>';})
                            });
                        }else{
                            if(d.data.successMsg){
                                prompt({
                                    content: d.successMsg.map(function(n){return '<p>'+n+'</p>';})
                                })
                            }
                        }
                        return d;
                    },
                    function error(d){
                        return $q.reject(d);
                    }
                );
            }
        }
    ])
    
    .config(
    ['$httpProvider',
        function($httpProvider){
            $httpProvider.interceptors.push('responseinterceptor');
        }
    ])

    /**
     * @name utils.heredoc 
     * @param f {function} 
     * @description multi-line template in a 'function(){}' wrap
     */
    .factory('heredoc',
    ['config',
        function(c){
            return function(f){
                return f.toString()
                        .replace(c.docprefix, '')
                        .replace(c.docsuffix, '')
//                         .replace(c.docN, '');
            }
        }
    ])
    
    .factory('fixed',
    [
        function(){
            return function(target,attachment,options){
                var offset = target[0].getBoundingClientRect(),
                    tip = attachment,
                    tipRect = tip[0].getBoundingClientRect(),
                    arrowGap = 6,
                    css = {},
                    tipW,tipH,
                    opts = {
                        dir:'b',
                        x:0,
                        y:0
                    };

                angular.extend(opts,options);
                tipW = tipRect.right - tipRect.left;
                tipH = tipRect.bottom - tipRect.top;

                switch(opts.dir){
                    case 'l':
                        css = {
                            left:offset.left - tipW - arrowGap,
                            top:offset.top - tipH/2 + (offset.bottom - offset.top)/2
                        };
                        break;
                    case 'r':
                        css = {
                            left:offset.right + tipW +arrowGap,
                            top:offset.top - tipH/2 + (offset.bottom - offset.top)/2
                        };
                        break;
                    case 't':
                        css = {
                            left:offset.left - tipW/2 + (offset.right - offset.left)/2,
                            top:offset.top - arrowGap
                        };
                        break;
                    default:
                        css = {
                            left:offset.left - tipW/2 + (offset.right - offset.left)/2,
                            top:offset.bottom + arrowGap
                        };
                        break;
                }

                css.left += +opts.x||0;
                css.top += +opts.y||0;
                
                css.left += 'px';
                css.top += 'px';

                tip.css(css);
            }
        }
    ])
    
    /**
     * @param options{
     * 		type:String "warning", "info", "danager", "success"(default)
     * 		title:String,
     * 		content:String
     * }
     */
    .factory("prompt",
    ['$timeout',
        function($timeout){
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
                var $item = angular.element(template(opt));
                box.append($item);
                
                hasQueue && $timeout(function(){
                    action();
                },addSpan);
                
                showQueue.push($timeout(function(){
                    $item.addClass('animate-leave');
                    $timeout(function(){
                        $item.remove();
                    },600);
                    showQueue.shift();
                    if(!showQueue.length){
                        boxTimeout = $timeout(function(){
                            box[0].style.display = 'block';
                            boxTimeout=null;
                        },600);
                    }
                },removeSpan));
            }else{
                return;
            }
        },
        box = angular.element("<div class='prompt-box'></div>"),
        prompt = function(options){
            if(!document.querySelectorAll(".prompt-box").length){
                document.body.appendChild(box[0]);
            }
            
            if(!queue.length){
                if(boxTimeout){
                    $timeout.cancel(boxTimeout);
                    boxTimeout = null;
                }else{
                    box[0].style.display = 'block';
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
                $timeout.cancel(showQueue.unshift());
            }
        };
            
        return prompt;
    }])
    
    .factory('tipDom',
    ['heredoc',
        function(heredoc){
            var tipHTML = heredoc(function(){/*!
                <div class="cm-tip hide">
                    <div class="cm-tip-arrow"></div>
                    <div class="cm-tip-content"></div>
                 </div>
            */});
            var tip = angular.element(tipHTML);

            angular.element(document.body).append(tip);
            
            return tip;
        }
    ])
    
    /**********************************************
                     指令 directive 
    **********************************************/
    
    .directive('tip',
    ['fixed','tipDom',
        function(fixed,tipDom){
            return {
                restrict:'A',
                compile:function(){
                    
                    return function(scope,element,attr){
                        var tip = tipDom;
                        
                        element.bind('mouseenter',function(){
                            
                            tip.removeClass('hide');
                            tip.children().eq(1).text(attr.tip)

                            if(attr.alignment === 'l'){
                                fixed(element,tip,{dir:'l'});
                                tip.children().eq(0).addClass('cm-tip-arrow-left');
                            }else{
                                fixed(element,tip);
                                tip.children().eq(0).removeClass('cm-tip-arrow-left');
                            }
                        });
                        
                        element.bind('mouseleave',function(){
                            tip.addClass('hide');
                        })
                    }
                }
            }
        }
    ])
    
    /**********************************************
                     控制器 controller 
    **********************************************/
    
    .controller('commonController',
    [
        function(){
            
        }
    ]);
})
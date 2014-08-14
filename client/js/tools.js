define(['angular'],function(angular){
    angular.module('utils',[])

    .constant('config',{
        docprefix:/^[^\/]+\/\*!?/,
        docsuffix:/\*\/[^\/]+$/,
        docN:/ *\n */g,
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
                        .replace(c.docN, '');
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
    }]);
})
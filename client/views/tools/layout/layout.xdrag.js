define(['angular','init'],function(angular){
    
    angular.module('layout')
    
    .factory('xdragGenerateElement',
    [
        function(){
            //生成占位元素
            return function(el,contain,isInsert){
                var clone = el.clone();
                            
                if(isInsert){
                    el.after(clone);
                }else{
                    contain.append(clone);
                }
                
                var style = clone[0].style;
                var rect = clone[0].getBoundingClientRect();
                var css = {};
                
                //定位元素
                if(style.position === 'absolute' || style.position === 'fixed'){
                    css.top = style.top;
                    css.right = style.right;
                    css.bottom = style.bottom;
                    css.left = style.left;
                }
                
                if(!style.width){
                    //TODO 判断太长，不够全面，需优化
                    if(!(
                        clone[0].tagName === 'DIV'
                        && (!style.display || style.display === 'block')
                        && style.float !== 'left'
                        && style.float !== 'right'
                        && style.position !== 'absolute'
                        && style.position !== 'fixed'
                    )){
                        css.width = rect.right - rect.left +'px';
                    }
                }
                if(!style.height){
                    css.height = rect.bottom - rect.top +'px';
                }
                
                clone.html('');
                clone.addClass('component-placeholder');
                clone.css(css);
                
                return clone;
            }
        }
    ])
    
    .directive('xdrag',
    ['$timeout','$window','$compile','xdragGenerateElement',
        function($timeout,   $window,   $compile,   generateElement){
            return {
                restrict:'A',
                compile:function(){
                    var body = angular.element(document.body);
                    
                    return function(scope,element,attr){
                        var event;
                        var relativeX;
                        var relativeY;
                        var moveTimer;
                        var time = 100;
                        var placeholder;//占位元素
                        
                        element.bind('mousedown',function(e){
                            e.preventDefault();
                            event = e;
                            startDrap();
                        });
                        
                        startDrap();
                        
                        //开始拖拽
                        function startDrap(){
                            var rect = element[0].getBoundingClientRect();
                            if(event){
                                relativeX = event.clientX - rect.left;
                                relativeY = event.clientY - rect.top;
                            }else{
                                relativeX = 10;
                                relativeY = 10;
                            }
                            
                            element.addClass('draging');
                            body.bind('mousemove',mousemove);
                            body.bind('mouseup',mouseup);
                        }
                        
                        //移动组件
                        function mousemove(e){
                            var x = e.clientX - relativeX;
                            var y = e.clientY - relativeY;
                            
                            element.css({
                                top:y + 'px',
                                left:x + 'px'
                            });
                            
                            if(moveTimer){
                                $timeout.cancel(moveTimer);
                            }
                            
                            moveTimer = $timeout(function(){
                                checkContain(e.clientX,e.clientY);
                            },time);
                        }
                        
                        //鼠标按起
                        function mouseup(e){
                            var x = e.clientX;
                            var y = e.clientY;
                            
                            checkContain(x,y);
                            
                            event = null;
                            element.removeClass('draging');
                            body.unbind('mousemove');
                            body.unbind('mouseup');
                            
                            if(moveTimer){
                                $timeout.cancel(moveTimer);
                            }
                            
                            if(scope.lastContainScope && scope.lastContainScope.hideRect){
                                scope.lastContainScope.hideRect();
                            }
                            
                            if(scope.placeholder){
                                var el = element.children();
                                scope.placeholder.parent().append(el);
                                scope.placeholder.remove();
                            }
                            
                            scope.$destroy();
                            element.remove();
                        }
                        
                        //查找包含块
                        function checkContain(x,y){
                            var contain = angular.element($window.document.elementFromPoint(x,y));
                            var containScope = contain.scope();
                            var lastContainScope = scope.lastContainScope;
                            var lastIsContain = scope.lastIsContain;
                            var placeholder = scope.placeholder;
                            
                            if(containScope !== lastContainScope){
                                if(lastContainScope && lastContainScope.hideRect){
                                    lastContainScope.hideRect();
                                }
                            }
                            
                            if(!containScope && !lastContainScope){
                                //元素不是一个包含块，并且上一个元素也不是包含块
                                return;
                            }else if(!containScope && lastIsContain && lastContainScope){
                                //元素不是一个包含块，但上一个元素是包含块，上一元素可包含组件
                                lastContainScope.hideRect();
                                placeholder.remove();
                                placeholder = null;
                                lastIsContain = false;
                            }else if(containScope && lastIsContain && lastContainScope){
                                //元素是包含块，上一个元素也是包含块，上一元素可包含组件
                                var containMap = contain.attr('xcontain') && containScope.xcontain;
                                var isContain = containMap === '*' || (angular.isObject(containMap) && attr.component in containMap);
                                
                                lastContainScope.hideRect();
                                if(isContain){
                                    //当前元素可包含组件
                                    placeholder.remove();
                                    placeholder = generateElement(element.children(),contain);
                                    containScope.showRect();
                                    lastIsContain = true;
                                }else{
                                    (containScope.showRect || angular.noop)(false);
                                    placeholder.remove();
                                    placeholder = null;
                                    lastIsContain = false;
                                }
                            }else if(containScope && !lastIsContain){
                                //元素时包含块，上一个元素不是包含块
                                var containMap = contain.attr('xcontain') && containScope.xcontain;
                                var isContain = containMap === '*' || (angular.isObject(containMap) && attr.component in containMap);
                                
                                if(isContain){
                                    //当前元素可包含组件
                                    placeholder = generateElement(element.children(),contain);
                                    containScope.showRect();
                                    lastIsContain = true;
                                }else{
                                    (containScope.showRect || angular.noop)(false);
                                    lastIsContain = false;
                                }
                            }
                                
                            scope.lastContainScope = containScope;
                            scope.lastIsContain = lastIsContain;
                            scope.placeholder = placeholder;
                        }
                    };
                }
            }
        }
    ]);
});
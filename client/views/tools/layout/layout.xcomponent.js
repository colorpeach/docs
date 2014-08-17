define(['angular','init'],function(angular){
    
    angular.module('layout')
    
    .factory('rectDom',
    ['heredoc',
        function(heredoc){
            var rect = heredoc(function(){/*!
                <div class="contain-rect hide">
                </div>
            */});
            var rectDom = angular.element(rect);
            
            angular.element(document.body).append(rectDom);
            
            return rectDom;
        }
    ])
    
    .directive('xcomponent',
    ['$compile','componentTpls','$timeout','components','rectDom','xdragGenerateElement',
        function($compile,   componentTpls,   $timeout,   components,   rectDom,   generateElement){
            
            return {
                restrict:'A',
                scope:{},
                compile:function(element,attr){
                    var body = angular.element(document.body);
                    var timer;
                    var time = 200;
                    
                    return function(scope,element,attr){
                        var component = attr.xcomponent;
                        var prefix = component.split('-')[0];
                        
                        if(prefix === 'self'){
                            component = component.split('-')[1];
                        }
                        
                        scope.xcontain = attr.xcontain === '*' ? '*' : components[attr.xcontain];
                        
                        scope.showRect = function(isContain){
                            var rect = element[0].getBoundingClientRect();
                            var css = {};
                            for(var s in rect){
                                css[s] = rect[s] + 'px';
                            }
                            rectDom.css(css);
                            rectDom.removeClass('hide');
                            if(isContain === false){
                                rectDom.addClass('error');
                            }else{
                                rectDom.removeClass('error');
                            }
                        };
                        
                        scope.hideRect = function(){
                            rectDom.addClass('hide');
                        };
                        
                        element.unbind('mousedown');
                        element.unbind('mouseup');
                        
                        element.bind('mousedown',function(e){
                            prefix !== 'self' && e.preventDefault();
                            e.stopPropagation();
                            
                            if(timer){
                                $timeout.cancel(timer);
                            }
                            
                            timer = $timeout(function(){
                                createDrap(e);
                            },time);
                        });
                        
                        element.bind('mouseup',function(){
                            if(timer){
                                $timeout.cancel(timer);
                            }
                        });
                        
                        function createDrap(e){
                            var cpt = angular.element(componentTpls[component]);
                            var newScope = scope.$new();
                            
                            if(prefix === 'self'){
                                newScope.placeholder = generateElement(element,element.parent(),true);
                                newScope.lastContainScope = element.parent().scope();
                                newScope.lastIsContain = true;
                                //如果组件已经插入视图，使用当前组件自身结构编译
                                cpt.html('').append(element);
                            }
                            
                            $compile(cpt)(newScope);
                            
                            cpt.css({
                                display:'block',
                                top:e.clientY - 10 + 'px',
                                left:e.clientX - 10 + 'px'
                            });
                            
                            body.append(cpt);
                        }
                    }
                }
            }
        }
    ]);
});
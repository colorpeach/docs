define(['angular','init'],function(angular){
    
    angular.module('layout')
    
    .directive('xdrag',
    [
        function(){
            return {
                restrict:'A',
                compile:function(){
                    var body = angular.element(document.body);
                    
                    return function(scope,element,attr){
                        
                        element.bind('mousedown',function(){
                            scope.draging = true;
                        });
                        
                        element.bind('mouseup',function(){
                            scope.draging = false;
                        });
                        
                        scope.$watch('draging',function(){
                            if(scope.draging){
                                body.bind('mousemove',mousemove);
                            }else{
                                body.unbind('mousemove',mousemove);
                            }
                        });
                        
                        function mousemove(e){
                            var x = e.clientX;
                            var y = e.clientY;
                            
                            element.css({
                                top:y,
                                left:x
                            });
                        }
                    };
                }
            }
        }
    ]);
});
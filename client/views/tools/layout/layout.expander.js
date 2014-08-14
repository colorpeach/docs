define(['angular','init'],function(angular){
    
    angular.module('layout')
    
    .directive('expander',
    [
        function(){
            return {
                restrict:'A',
                link:function(scope,element,attr){
                    var dt = element.find('dt');
                    var expander = '<span class="xicon-chevron-right">';
                    
                    dt.prepend(expander);
                    scope.expand = false;
                    
                    dt.bind('click',function(){
                        scope.expand = !scope.expand;
                        
                        element.find('dd').toggleClass('hide');
                        
                        dt.find('span').toggleClass('xicon-chevron-right').toggleClass('xicon-chevron-down');
                    });
                }
            }
        }
    ]);
});
angular.module('ui.tree')

.directive('xtreenode',
['xtree.config',
    function(config){
        return {
            restrict:'A',
            link:function(scope,element,attrs){
                scope.collapsed = function(event){
                    scope.node._collapsed = !scope.node._collapsed;
                    event.stopPropagation();
                };
            }
        };
    }
]);
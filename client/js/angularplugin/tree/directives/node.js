angular.module('ui.tree')

.directive('xtreenode',
['xtree.config',
    function(config){
        return {
            restrict:'A',
            scope:true,
            link:function(scope,element,attrs){
                scope._collapsed = true;
            }
        };
    }
]);
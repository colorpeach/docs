angular.module('ui.tree')

.directive('xtree',
['xtree.config',
    function(config){
        return {
            restrict:'A',
            scope: {
                nodes : '=xtree'
            },
            controller:'xtreeController',
            templateUrl:config.treeTemplate,
            link:function(scope,element,attrs){
                angular.extend(scope,config);
                scope.node = {
                    children:scope.nodes
                };

                scope.opera = {
                    activeNode:""
                };
            }
        };  
    }
]);
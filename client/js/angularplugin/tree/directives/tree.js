angular.module('ui.tree')

.directive('xtree',
['xtree.config',
    function(config){
        return {
            restrict:'A',
            scope: {
                nodes : '=xtree'
            },
            controller:'treeController',
            templateUrl:config.treeTemplate,
            link:function(scope,element,attrs){
                scope.gridClass = config.treeClass;
                scope.nodeTemplate = config.nodeTemplate;
            }
        };  
    }
]);
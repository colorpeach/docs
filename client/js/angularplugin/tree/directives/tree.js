define(['angular','tree'],function(angular){
    angular.module('ui.tree')

    .directive('xtree',
    ['xtree.config','xtree.utils','xtree.exportProp',
        function(config,utils,exportProp){
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

                    if(config.simpleData){
                        scope.$watch('nodes',function(){
                            exportProp.data = scope.node.children = utils.transformToNexted(scope.nodes);
                        });
                    }

                    scope.opera = exportProp;
                    
                }
            };  
        }
    ]);
});
angular.module('ui.tree')

.directive('xtreenode',
['xtree.config',
    function(config){
        return {
            restrict:'A',
            scope: {
                node:'=xtreenode'
            },
            templateUrl:config.nodeTemplate,
            link:function(scope,element,attrs){
                scope.collapesd = function(event){
                    scope.node._collapesd = !scope.node._collapesd;
                    event.preventDefault();
                };
            }
        };
    }
]);
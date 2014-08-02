angular.module('ui.grid')

.directive('xgrid',
['xgrid.config',
    function(config){
        return {
            restrict:'A',
            scope: {
                data : '=xgrid'
            },
            controller:'gridController',
            templateUrl:config.gridTemplate,
            link:function(scope,element,attrs){
                scope.gridClass = config.gridClass;
            }
        };  
    }
]);
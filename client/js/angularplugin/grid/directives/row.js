angular.module('ui.grid')

.directive('xgridrow',
['xgrid.config',
    function(config){
        return {
            restrict:'A',
            scope: {
                row:'=xgridrow',
                cols:'=xgridcols'
            },
            templateUrl:config.rowTemplate,
            link:function(scope,element,attrs){
                console.log(scope);
            }
        };
    }
]);
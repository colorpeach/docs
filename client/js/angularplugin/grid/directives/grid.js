define(['angular','grid'],function(angular){
    angular.module('ui.grid')

    .directive('xgrid',
    ['xgrid.config',
        function(config){
            return {
                restrict:'A',
                scope: {
                    cols : '=xgridcols',
                    data : '=xgrid',
                    params : '=xgridparams'
                },
                controller:'gridController',
                templateUrl:config.gridTemplate,
                link:function(scope,element,attrs){
                    angular.extend(scope,config);
                }
            };  
        }
    ]);
});
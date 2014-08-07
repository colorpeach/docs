define(['angular','grid'],function(angular){
    angular.module('ui.grid')

    .directive('xgridrow',
    ['xgrid.config',
        function(config){
            return {
                restrict:'A',
                templateUrl:config.rowTemplate,
                compile:function(element,attrs){
                    console.log(arguments);
                },
                link:function(scope,element,attrs){
                    console.log(scope);
                }
            };
        }
    ]);
});
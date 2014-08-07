define(['angular','grid'],function(angular){
    angular.module('ui.grid')

    .factory('grid.export',
    ['grid.exportProp',
        function(exportProp){
            var exportObj = {

            };

            return exportObj;
        }
    ]);
});
define(['angular'],function(angular){
    angular.module('ui.grid',[])

    .constant('xgrid.config',{
        gridClass:'aui-grid',
        gridTemplate:'/js/angularplugin/grid/template/grid.html',
        rowTemplate:'/js/angularplugin/grid/template/row.html',
        templateDate:{},
        template:{
            select:'<select ng-model="row[col.field]" ng-options="o[0] as o[1] for o in templateDate[col.necessary]"><option></option></select>'
        }
    });
});
angular.module('ui.tree')

.factory('xtree.export',
['xtree.exportProp',
    function(exportProp){
        var exportObj = {
            getSelected:function(){
                return exportProp.activeNode;
            },
            deleteSelected:function(){
                  
            },
            cancelSelected:function(){
                exportProp.activeNode = {};
            },
            getData:function(){
                return exportProp.data;
            }
        };
        
        return exportObj;
    }
]);
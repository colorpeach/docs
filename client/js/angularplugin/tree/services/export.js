define(['angular','tree'],function(angular){
    angular.module('ui.tree')

    .factory('xtree.export',
    ['xtree.exportProp',
        function(exportProp){
            var exportObj = {
                getParentNode:function(){
                    return exportProp.scope.$parent.node;
                },
                getSelected:function(){
                    return exportProp.activeNode;
                },
                expandSelected:function(){
                    exportProp.scope._collapsed = false;
                },
                deleteSelected:function(){
                    if(!exportProp.scope){
                        return;
                    }
                    var i = 0;
                    var nodes = exportProp.scope.$parent.node.children;
                    var len = nodes.length;
                    var activeNode = exportProp.activeNode;
                    for(;i<len;i++){
                        if(activeNode === nodes[i]){
                            nodes.splice(i,1);
                            exportProp.scope.$destroy();
                            exportProp.scope = null;
                            exportProp.activeNode = null;
                            break;
                        }
                    }
                },
                cancelSelected:function(){
                    exportProp.activeNode = null;
                    exportProp.scope = null;
                },
                getData:function(){
                    return exportProp.data;
                }
            };

            return exportObj;
        }
    ]);
});
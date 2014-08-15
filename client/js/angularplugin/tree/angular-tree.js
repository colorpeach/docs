define(['angular'],function(angular){
    angular.module('ui.tree',[])

    .value('xtree.config',{
        simpleData:true,
        treeClass:'aui-tree',
        iconClass:'aui-tree-icon',
        nodeClass:'aui-tree-node',
        singleClass:'xicon-',
        expandClass:'xicon-chevron-down',
        collapseClass:'xicon-chevron-right',
        activeClass:'aui-active',
        treeTemplate:'/js/angularplugin/tree/template/tree.html',
        nodeTemplate:'/js/angularplugin/tree/template/node.html',
        onclick:angular.noop,
        oncollapse:angular.noop
    })

    .value('xtree.exportProp',{
        activeNode:{},
        scope:{},
        data:[]
    });
});
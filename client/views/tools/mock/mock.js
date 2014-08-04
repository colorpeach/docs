angular.module('app',['ui.grid','ui.tree'])

.value('requestCols',
[
    {
        name:'操作',
        width:'10%'
    },
    {
        name:'名称',
        width:'20%',
        field:'name'
    },
    {
        name:'类型',
        width:'20%',
        field:'type'
    },
    {
        name:'规则',
        width:'20%',
        field:'rule'
    },
    {
        name:'备注',
        width:'40%',
        field:'mark'
    }
])

.value('responseCols',
[
    {
        name:'名称',
        width:'20%',
        field:'name'
    },
    {
        name:'类型',
        width:'20%',
        field:'type'
    },
    {
        name:'规则',
        width:'20%',
        field:'rule'
    },
    {
        name:'备注',
        width:'40%',
        field:'mark'
    }
])

.controller('mockContent',
['$scope','xtree.config','xtree.export','requestCols','responseCols',
    function($scope,config,xtree,requestCols,responseCols){
        
        $scope.requestCols = requestCols;
        $scope.responseCols = responseCols;
        $scope.list = [];
        $scope.baseUrl = 'http://doc.colorpeach.com/mock/';
        
        $scope.detail = {
            name:'',
            method:'',
            url:'',
            description:'',
            request:[],
            response:[]
        };
        
        $scope.addNode = function(){
            var node = xtree.getSelected();
            var newNode = {name:'新建节点'};
            if(!node || !node.name){
                xtree.getData().push(newNode);
            }else{
                if(!node.children){
                    node.children = [];
                }
                node.children.push(newNode);
            }
            
        };
        
        $scope.deleteNode = function(){
            xtree.deleteSelected();  
        };
        
        $scope.cancelNode = function(){
            xtree.cancelSelected();
        };
        
        $scope.addRequest = function(){
            if(!$scope.detail.request){
                $scope.detail.request = [];
            }
            $scope.detail.request.push({});
        };
        
        $scope.addResponse = function(){
            if(!$scope.detail.response){
                $scope.detail.response = [];
            }
            $scope.detail.response.push({});
        };
            
        angular.extend(config,{
            onclick:function(e,data,scope){
                $scope.detail = data;
            }
        });
    }    
]);
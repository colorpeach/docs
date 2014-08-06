require.config({
    paths:{
        mock:'/lib/mock/mock'
    }
});

require(['mock'],function(Mock){
    angular.module('app',['ui.grid','ui.tree'])

    .value('requestCols',
    [
        {
            name:'操作',
            width:'10%',
            template:'<span class="xicon-remove" ng-click="removeRow($parent.$index)"></span>'
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
            name:'操作',
            width:'10%',
            template:'<span class="xicon-remove" ng-click="removeRow($parent.$index)"></span>'
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
    
    .factory('saveDetail',
    [
        function(){
            
        }
    ])
    
    .controller('mockContent',
    ['$scope','xtree.config','xtree.export','requestCols','responseCols',
        function($scope,config,xtree,requestCols,responseCols){
            var detail = {
                name:'',
                method:'',
                url:'',
                description:'',
                request:[],
                response:[]
            };
            
            $scope.requestCols = requestCols;
            $scope.responseCols = responseCols;
            $scope.list = [];
            $scope.baseUrl = 'http://doc.colorpeach.com/mock/';
            
            $scope.detail = detail
            
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
                xtree.expandSelected();
            };
            
            $scope.deleteNode = function(){
                xtree.deleteSelected();
                $scope.detail = detail;
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
            
            $scope.removeRequest = function(i){
                $scope.detail.request.splice(i,1);
            };
            
            $scope.addResponse = function(){
                if(!$scope.detail.response){
                    $scope.detail.response = [];
                }
                $scope.detail.response.push({});
            };
            
            $scope.saveDetail = function(){
                
            };
            
            $scope.generateData = function(){
                var data = {
                        request:{},
                        response:{}
                    };
                
                angular.forEach($scope.detail.request,function(n){
                    data.request[n.name+"|1-10"] = n.name;
                });
                
                angular.forEach($scope.detail.response,function(n){
                    data.response[n.name+"|1-10"] = n.name;
                });
                
                data.request = Mock.mock(data.request);
                data.response = Mock.mock(data.response);
                
                $scope.mockData = JSON.stringify(data,null,4);
            };
                
            angular.extend(config,{
                onclick:function(e,data,scope){
                    $scope.detail = data;
                }
            });
        }
    ]);
    
    angular.bootstrap(document,["app"]);
});


angular.module('app',['ui.grid','ui.tree'])

.controller('mockContent',
['$scope',
    function($scope){
        $scope.request = {
            columns:[
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
            ],
            rows:[]
        };
        
        $scope.response = {
            columns:[
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
            ],
            rows:[]
        };
        
        $scope.list = [
            {
                name:"节点1",
                id:1,
                children:[
                    {
                        name:"节点2",
                        id:2,
                        children:[
                            {
                                name:"节点4",
                                id:2
                            }
                        ]
                    }    
                ]
            },
            {
                name:"节点3",
                id:3
            }
        ];
        
        $scope.addRequest = function(){
            $scope.request.rows.push({});
        };
        
        $scope.addResponse = function(){
            $scope.response.rows.push({});
        };
    }    
]);
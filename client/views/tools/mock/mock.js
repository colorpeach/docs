angular.module('app',['ui.grid','ui.tree'])

.controller('mockContent',
['$scope',
    function($scope){
        $scope.table = {
            columns:[
                {
                    name:'th1',
                    width:'5%',
                    field:'a'
                },
                {
                    name:'th1',
                    width:'5%',
                    field:'b'
                }
            ],
            rows:[
                {
                    a:"ddd",
                    b:"bbb"
                },
                {
                    a:"ccc",
                    b:"aaa"
                }
            ]
        };
        
        $scope.list = [
            {
                name:"节点1",
                id:1,
                children:[
                    {
                        name:"节点2",
                        id:2
                    }    
                ]
            },
            {
                name:"节点3",
                id:3
            }
        ];
    }    
]);
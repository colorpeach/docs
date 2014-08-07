require.config({
    paths:{
        grid             :'/js/angularplugin/grid/angular-grid',
        gridControl      :'/js/angularplugin/grid/controllers/grid',
        gridDirGrid      :'/js/angularplugin/grid/directives/grid',
        gridDirRow       :'/js/angularplugin/grid/directives/row',
        gridDirRowInclude:'/js/angularplugin/grid/directives/row-include',
        gridSerExport    :'/js/angularplugin/grid/services/row-export',
        tree             :'/js/angularplugin/tree/angular-tree',
        treeControl      :'/js/angularplugin/tree/controllers/tree',
        treeDirTree      :'/js/angularplugin/tree/directives/tree',
        treeDirNode      :'/js/angularplugin/tree/directives/node',
        treeSerExport    :'/js/angularplugin/tree/services/export',
        treeSerUtils     :'/js/angularplugin/tree/services/utils'
    }
});

require([
    'angular',
    'mock',
    'utils',
    'grid',
    'gridControl',
    'gridDirGrid',
    'gridDirRow',
    'gridDirRowInclude',
    'gridSerExport',
    'tree',
    'treeControl',
    'treeDirTree',
    'treeDirNode',
    'treeSerExport',
    'treeSerUtils'
],function(angular,Mock){
    angular.module('app',['ui.grid','ui.tree'])
    
    .config(
    ['$routeProvider',
        function($routeProvider){
            $routeProvider
                .when('/',{
                    controller: 'mockDashboard',
                    templateUrl: '/mock-dashboard.html'
                })
                .when('/add',{
                    controller: 'mockAdd',
                    templateUrl: '/mock-add.html'
                })
                .when('/detail/:mockId',{
                    controller: 'mockData',
                    templateUrl: '/mock-detail.html'
                })
                .otherwise({
                    redirectTo:'/'
                });
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
            name:'规则',
            width:'20%',
            field:'rule'
        },
        {
            name:'值',
            width:'20%',
            field:'value'
        },
        {
            name:'类型',
            width:'20%',
            field:'type',
            necessary:'typeList',
            type:'select'
        },
        {
            name:'备注',
            width:'40%',
            field:'mark'
        }
    ])
    
    .factory('mockItem',
    ['$http',
        function($http){
            
            return {
                query:function(){
                    return $http.get('/get/user/mocks');
                },
                get:function(id){
                    return $http.get('/get/user/mock',{_id:id});
                },
                add:function(mock){
                    return $http.post('/post/add/mock',mock);
                },
                del:function(id){
                    return $http.post('/post/del/mock',{_id:id});
                }
            }
        }
    ])
    
    .controller('mockDashboard',
    ['$scope','mockItem',
        function($scope,mockItem){
            mockItem.query()
            .then(function(d){
                $scope.mocks = d.data.mocks;
            });
            
            $scope.delMock = function(e,i){
                mockItem.del(this.mock._id)
                .then(function(d){
                    if(!d.data.error){
                        $scope.mocks.splice(i,1);
                    }
                });
                e.preventDefault();
            };
        }
    ])
    
    .controller('mockAdd',
    ['$scope','mockItem','$location',
        function($scope,mockItem,$location){
            $scope.save = function(){
                if($scope.addForm.$invalid){
                    return;
                }
                mockItem.add($scope.mock)
                .then(function(d){
                    if(!d.data.error){
                        $location.url('/');
                    }
                });
            }
        }
    ])
    
    .controller('mockData',
    ['$scope','mockItem','$routeParams','xtree.config','xtree.export','responseCols','xgrid.config',
        function($scope,   mockItem,   $routeParams,   config,   xtree,   responseCols,   gridConfig){
            mockItem.get($routeParams.mockId)
            .then(function(d){
                $scope.list = d.data.mock.list;
                $scope.name = d.data.mock.name;
            });
            
            var detail = {
                name:'',
                method:'',
                url:'',
                description:'',
                request:[],
                response:[]
            };
            
            $scope.list = [];
            $scope.requestCols = angular.copy(responseCols);
            $scope.responseCols = responseCols;
            $scope.baseUrl = 'http://doc.colorpeach.com/mock/';
            
            $scope.detail = detail;
            
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
                    var key = n.name + (n.rule ? ('|'+n.rule) : '');
                    var value = n.type ? ('@'+n.type) : n.value;
                    
                    data.request[key] = value;
                });
                
                angular.forEach($scope.detail.response,function(n){
                    var key = n.name + (n.rule ? ('|'+n.rule) : '');
                    var value = n.type ? ('@'+n.type) : n.value;
                    
                    data.response[key] = value;
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
                
            angular.extend(gridConfig,{
                templateDate:{
                    typeList:[
                        ["","不使用"],
                        [
                            "boolean",
                            "Basics.boolean"
                        ],
                        [
                            "natural",
                            "Basics.natural"
                        ],
                        [
                            "integer",
                            "Basics.integer"
                        ],
                        [
                            "float",
                            "Basics.float"
                        ],
                        [
                            "character",
                            "Basics.character"
                        ],
                        [
                            "string",
                            "Basics.string"
                        ],
                        [
                            "range",
                            "Basics.range"
                        ],
                        [
                            "date",
                            "Basics.date"
                        ],
                        [
                            "time",
                            "Basics.time"
                        ],
                        [
                            "datetime",
                            "Basics.datetime"
                        ],
                        [
                            "now",
                            "Basics.now"
                        ],
                        [
                            "image",
                            "Image.image"
                        ],
                        [
                            "dataImage",
                            "Image.dataImage"
                        ],
                        [
                            "color",
                            "Color.color"
                        ],
                        [
                            "paragraph",
                            "Text.paragraph"
                        ],
                        [
                            "sentence",
                            "Text.sentence"
                        ],
                        [
                            "word",
                            "Text.word"
                        ],
                        [
                            "title",
                            "Text.title"
                        ],
                        [
                            "first",
                            "Name.first"
                        ],
                        [
                            "last",
                            "Name.last"
                        ],
                        [
                            "name",
                            "Name.name"
                        ],
                        [
                            "url",
                            "Web.url"
                        ],
                        [
                            "domain",
                            "Web.domain"
                        ],
                        [
                            "email",
                            "Web.email"
                        ],
                        [
                            "ip",
                            "Web.ip"
                        ],
                        [
                            "tld",
                            "Web.tld"
                        ],
                        [
                            "area",
                            "Address.area"
                        ],
                        [
                            "region",
                            "Address.region"
                        ],
                        [
                            "capitalize",
                            "Helpers.capitalize"
                        ],
                        [
                            "upper",
                            "Helpers.upper"
                        ],
                        [
                            "lower",
                            "Helpers.lower"
                        ],
                        [
                            "pick",
                            "Helpers.pick"
                        ],
                        [
                            "shuffle",
                            "Helpers.shuffle"
                        ],
                        [
                            "guid",
                            "Miscellaneous.guid"
                        ],
                        [
                            "id",
                            "Miscellaneous.id"
                        ]
                    ]
                }
            });
        }
    ]);
    
    angular.bootstrap(document,["app"]);
});


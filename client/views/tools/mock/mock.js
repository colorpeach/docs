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
            $routeProvider.
                when('/',{
                    controller: 'mockDashboard',
                    templateUrl: '/mock-dashboard.html'
                }).when('/add',{
                    controller: 'mockAdd',
                    templateUrl: '/mock-add.html'
                }).when('/detail/:mockId',{
                    controller: 'mockData',
                    templateUrl: '/mock-detail.html'
                }).otherwise({
                    redirectTo:'/'
                });
        }
    ])

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
    
    .factory('saveDetail',
    [
        function(){
            
        }
    ])
    
    .controller('mockDashboard',
    [
        function(){
            
        }
    ])
    
    .controller('mockAdd',
    [
        function(){
            
        }
    ])
    
    .controller('mockData',
    ['$scope','xtree.config','xtree.export','requestCols','responseCols','xgrid.config',
        function($scope,config,xtree,requestCols,responseCols,gridConfig){
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


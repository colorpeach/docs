require.config({
    paths:{
        generateMock     :'/utils/generateMock',
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
    'generateMock',
    'tools',
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
],function(angular,Mock,generateMockTpl){
    angular.module('mock',['tools','ui.grid','ui.tree'])
    
    .config(
    ['$routeProvider',
        function($routeProvider){
            $routeProvider
                .when('/',{
                    controller: 'mockDashboard',
                    templateUrl: '/mock-dashboard.html',
                    resolve:{
                        mockItems:function(){
                            
                        }
                    }
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
            template:'<span class="xicon-remove" data-tip="删除数据" ng-click="removeRow($parent.$index)" ng-show="params.edit"></span>'+
                     '<span class="xicon-plus" data-tip="添加子数据" ng-show="params.edit && (row.type == \'array\'||row.type == \'object\')" ng-click="insertAfter($parent.$index+1,{pKey:data[$parent.$index].unique})"></span>'
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
            name:'参数',
            width:'15%',
            field:'params'
        },
        {
            name:'备注',
            width:'25%',
            field:'mark'
        }
    ])
    
    .value('typeList',
    [
        ["","不使用"],
        ["array","Array"],
        ["object","Object"],
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
    ])
    
    .value('guid',function(){
        return new Date().getTime() + '' + Math.random();
    })
    
    .factory('mockItem',
    ['$http',
        function($http){
            
            return {
                query:function(){
                    return $http.get('/get/user/mocks');
                },
                add:function(mock){
                    return $http.post('/post/add/mock',mock);
                },
                del:function(id){
                    return $http.post('/post/del/mock',{_id:id});
                },
                getItem:function(id,_id){
                    return $http.get('/get/mock/item?id='+id+'&_id='+_id);
                },
                getDetail:function(id){
                    return $http.get('/get/mock/detail?_id='+id);
                },
                addItem:function(item){
                    return $http.post('/post/add/mock/item',item);
                },
                updateItem:function(item){
                    return $http.post('/post/update/mock/item',item);
                },
                deleteItem:function(data){
                    return $http.post('/post/del/mock/item',data);
                }
            }
        }
    ])
    
    .factory('generateMock',
    ['addUnique',
        function(addUnique){
            return function(data,isTpl){
                addUnique(data);
                return generateMockTpl.do(Mock,data,isTpl);
            }
        }
    ])
    
    .factory('addUnique',
    ['guid',
        function(guid){
            return function(list){
                if(!list) return;

                for(var i=0,l=list.length;i<l;i++){
                    if(!list[i].unique){
                        list[i].unique = guid();
                    }
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
                e.preventDefault();
                e.stopPropagation();
                if(!confirm('确认删除 '+this.mock.name)){
                    return;
                }
                mockItem.del(this.mock._id)
                .then(function(d){
                    if(!d.data.error){
                        $scope.mocks.splice(i,1);
                    }
                });
            };
        }
    ])
    
    .controller('mockAdd',
    ['$scope','mockItem','$location',
        function($scope,mockItem,$location){
            $scope.saving = false;
            
            $scope.save = function(){
                if($scope.saving){
                    return;
                }
                
                if($scope.addForm.$invalid){
                    if($scope.addForm.name.$error.required){
                        $scope.errorMsg = '请输入项目名称';
                    }else if($scope.addForm.description.$error.required){
                        $scope.errorMsg = '请输入项目描述';
                    }
                    return;
                }
                
                $scope.saving = true;
                $scope.errorMsg = '';
                
                mockItem.add($scope.mock)
                .then(function(d){
                    $scope.saving = false;
                    if(!d.data.error){
                        $location.url('/');
                    }
                });
            }
        }
    ])
    
    .controller('mockData',
    ['$scope','mockItem','$routeParams','prompt','xtree.config',
    'xtree.export','responseCols','xgrid.config','typeList','generateMock','addUnique','guid',
        function($scope,   mockItem,   $routeParams,   prompt,   config,
        xtree,   responseCols,   gridConfig,   typeList,   generateMock,   addUnique,   guid){
            var mockId = $routeParams.mockId;
            
            mockItem.getDetail(mockId)
            .then(function(d){
                $scope.list = d.data.nodes.list || [];
                $scope.name = d.data.nodes.name;
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
            $scope.baseUrl = location.origin+'/mock/'+mockId+'/';
            $scope.saving = false;
            $scope.status = {
                addNode:false,
                edit:false,
                exchange:''
            };
            
            $scope.detail = detail;
            
            $scope.addNode = function(e){
                if(e.keyCode === 13){
                    
                    if(!$scope.nodeName){
                        return;
                    }
                    
                    var node = xtree.getSelected();
                    var newNode = {name:$scope.nodeName,_id:mockId};
                    
                    if(node && node.name){
                        newNode.parentId = node.id;
                    }
                    
                    mockItem.addItem(newNode)
                    .then(function(d){
                        newNode.id = d.data.id;
                        
                        if(!node || !node.name){
                            xtree.getData().push(newNode);
                        }else{
                            if(!node.children){
                                node.children = [];
                            }
                            node.children.push(newNode);
                            xtree.expandSelected();
                        }
                        $scope.status.addNode = false;
                        $scope.nodeName = "";
                    });
                }
            };
            
            $scope.deleteNode = function(){
                var node = xtree.getSelected();
                
                if(!node || !node.id){
                    return;
                }
                
                if(!confirm('确认删除 ' + node.name)){
                    return;
                }
                
                mockItem.deleteItem({id:node.id,_id:mockId})
                .then(function(){
                    xtree.deleteSelected();
                    $scope.detail = detail;
                });
            };
            
            $scope.cancelNode = function(){
                xtree.cancelSelected();
                $scope.detail = detail;
            };
            
            $scope.addRequest = function(){
                if(!$scope.detail.request){
                    $scope.detail.request = [];
                }
                $scope.detail.request.push({unique:guid()});
            };
            
            $scope.removeRequest = function(i){
                $scope.detail.request.splice(i,1);
            };
            
            $scope.addResponse = function(){
                if(!$scope.detail.response){
                    $scope.detail.response = [];
                }
                $scope.detail.response.push({unique:guid()});
            };
            
            $scope.saveDetail = function(){
                //给数据加上unique
                addUnique($scope.detail.request);
                addUnique($scope.detail.response);
                
                var data = angular.copy($scope.detail);
                
                if($scope.saving){
                    prompt({
                        type:'warning',
                        content:'正在保存...'
                    });
                    return;
                }
                
                if(!data.id){
                    return;
                }
                
                $scope.saving = true;
                
                data._id = mockId;
                delete data.children;
                
                mockItem.updateItem(data)
                .then(function(d){
                    $scope.saving = false;
                    if(!d.data.error){
                        prompt({
                            content:'更新接口文档成功'
                        });
                    }
                });
            };
            
            $scope.generateData = function(isTpl){
                var data = {};
                
                data.request = generateMock($scope.detail.request,isTpl);
                data.response = generateMock($scope.detail.response,isTpl);
                
                return JSON.stringify(data,null,4);
            };
            
            $scope.openModal = function(type){
                $scope.modalOpened = true;
                $scope.status.exchange = type;
                
                if(type === 'export' || type === 'data'){
                    if(type === 'export')
                        $scope.exportData = $scope.generateData(true);
                    else
                        $scope.exportData = $scope.generateData();
                }else{
                    $scope.exportData = '';
                }
            }
            
            $scope.preventHide = function(e){
                e.stopPropagation();
            }
            
            $scope.import = function(){
                var type = $scope.status.exchange;
                var data = JSON.parse($scope.exportData);
                
                if(type === 'request' || type === 'response'){
                    $scope.detail[type] = generateMockTpl.convert(data);
                }else if(type === 'import'){
                    angular.extend($scope.detail,data);
                    $scope.detail['request'] = generateMockTpl.convert(data.request);
                    $scope.detail['response'] = generateMockTpl.convert(data.response);
                }
                $scope.modalOpened = false;
            };
                
            angular.extend(config,{
                onclick:function(e,data,scope){
                    if(!scope._clicked){
                        mockItem.getItem(data.id,mockId)
                        .then(function(d){
                            scope._clicked = true;
                            
                            angular.extend(data,d.data.node);
                            
                            $scope.detail = data;
                        });
                    }else{
                        $scope.detail = data;
                    }
                }
            });
                
            angular.extend(gridConfig,{
                templateDate:{
                    typeList:typeList
                }
            });
        }
    ]);
    
    angular.bootstrap(document,['mock']);
});


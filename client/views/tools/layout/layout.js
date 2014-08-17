require.config({
    paths:{
        init       : '/views/tools/layout/layout.init',
        expander   : '/views/tools/layout/layout.xexpander',
        xcomponent : '/views/tools/layout/layout.xcomponent',
        xslidebar : '/views/tools/layout/layout.xslidebar',
        xdrag      : '/views/tools/layout/layout.xdrag'
    }
});

require([
    'angular',
    'init',
    'expander',
    'xcomponent',
    'xslidebar',
    'xdrag'
],function(angular){
    
    angular.module('layout')
    
    .controller('layoutController',
    ['$scope','components','layouts',
        function($scope,  components,  layouts){
            $scope.components = components;
            $scope.layouts = layouts;
        }
    ]);
});
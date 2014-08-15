define(['angular','grid'],function(angular){
    angular.module('ui.grid')

    .controller('gridController',
    ['$scope',
        function($scope){
            $scope.removeRow = function(i){
                $scope.data.splice(i,1);
            };
            
            $scope.insertAfter = function(i,data){
                $scope.data.splice(i,0,data||{});
            }
        }
    ]);
});
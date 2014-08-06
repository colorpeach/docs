angular.module('ui.grid')

.controller('gridController',
['$scope',
    function($scope){
        $scope.removeRow = function(i){
            $scope.data.splice(i,1);
        };
    }
]);
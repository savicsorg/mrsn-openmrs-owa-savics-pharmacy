angular.module('StockAtRiskController', ['ngMaterial','ngAnimate', 'toastr', 'md.data.table']).controller('StockAtRiskController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest','toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = { "Pharmacy management module": "", "Inventory": "index.html#!/inventory", "Stock at risk": "stockatrisk"};
    $scope.loading = false;
    $scope.stockAtRisk = [];

    $scope.getStockAtRisk = function () {
        $scope.loading = true;        
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            $scope.stockAtRisk = response.results;
            $scope.loading = false;
        }, function(e){
            $scope.loading = false; 
            toastr.error('An unexpected error has occured.', 'Error');
        });
    };

    //$scope.getData();

    $scope.query = {
        limit: 5,
        page: 1
    };

    $scope.logPagination = function (page, limit) {
        
    };


}])

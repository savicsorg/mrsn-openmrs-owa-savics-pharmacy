angular.module('stocktakesController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('stocktakesController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = { "Pharmacy management module": "", "Inventory": "index.html#!/inventory" };
    $scope.loading = false;
    $scope.stocktakes = [];
    $scope.stockAtRisOnly = false;

    $scope.getData = function () {
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/itemsLine").then(function (response) {
            $scope.stocktakes = response.results;
            $scope.loading = false;
        }, function (e) {
            $scope.loading = false;
            toastr.error('An unexpected error has occured.', 'Error');
        });
    };

    $scope.getData();

    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: true,
        pageSelector: true,
        rowSelection: true
    };

    $scope.query = {
        limit: 5,
        page: 1
    };

    $scope.logPagination = function (page, limit) {

    };

}])

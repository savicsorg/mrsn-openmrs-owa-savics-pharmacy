angular.module('InventoryController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('InventoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
        $scope.resource = "savicspharmacy";
        $rootScope.links = {"Pharmacy management module": "", "Inventory": "index.html#!/inventory"};
        $scope.loading = false;
        $scope.viewOnStock = [];
        $scope.stockAtRisOnly = false;

        $scope.getData = function () {
            $scope.loading = true;
            openmrsRest.getFull($scope.resource + "/item").then(function (response) {
                $scope.viewOnStock = response.results;
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
            limit: 25,
            page: 1
        };

        $scope.logPagination = function (page, limit) {

        };

        $scope.openView = function (data) {
            $state.go('home.viewdetail', {
                item: data,
                id: data.id
            });
        };

        $scope.openAdjustement = function (data) {
            $state.go('home.adjustment', {
                item: data.code,
                id: data.id
            });
        };

        $scope.openHistory = function (data) {
            $state.go('home.viewhistory', {
                item: data.code,
                uuid: data.uuid
            });
        };

        $scope.onlyStockAtRisk = function (item) {
            if ($scope.stockAtRisOnly == true) {
                return item.numberOfExpiredLots > 0;
            } else {
                return true;
            }
        };


        $scope.donwload = function () {
            let link = window.location.protocol + "//" + window.location.host + "/openmrs/ws/rest/v1/savicspharmacy/items/stockatrisk?atriskOnly="+$scope.stockAtRisOnly;
            localStorage.setItem("export_link", link);
            window.location = link;
        }

    }])

angular.module('InventoryController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('InventoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr, $translate) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = { "Pharmacy management module": "", "Inventory": "index.html#!/inventory" };
    $scope.loading = false;
    $scope.viewOnStock = [];
    $scope.stockAtRisOnly = false;
    $scope.searchAll = "";

    $scope.getData = function () {
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            $scope.viewOnStock = response.results;
            $scope.loading = false;
        }, function (e) {
            $scope.loading = false;
            toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
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
    
    $scope.label = {
        page: $translate.instant("Page")  + $translate.instant(":"),
        rowsPerPage: $translate.instant("Rows per page") + $translate.instant(":"),
        of: $translate.instant("of")
    }

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

    $scope.search = function (item) {
        if($scope.searchAll == "" || ($scope.searchAll.length > 0 && item.name.toLowerCase().indexOf($scope.searchAll.toLowerCase()) > -1)){
            if ($scope.stockAtRisOnly == true) {
                return item.numberOfExpiredLots > 0 || item.soh < item.stockMin;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };


    $scope.donwload = function () {
        let link = window.location.protocol + "//" + window.location.host + "/openmrs/ws/rest/v1/savicspharmacy/items/stockatrisk?atriskOnly=" + $scope.stockAtRisOnly;
        localStorage.setItem("export_link", link);
        window.location = link;
    }

}])

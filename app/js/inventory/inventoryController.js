angular.module('InventoryController', []).controller('InventoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des type customers";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Inventory": "inventory", };
    var vm = this;
    vm.appTitle = "Stock and inventory";



    $scope.getAllDrug = function () {
        $scope.viewOnStock = [];
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            if (response.results.length >= 1) {
                $scope.viewOnStock = response.results;
                console.log($scope.viewOnStock)
            }
        })
    }
    $scope.getAllDrug();

    $scope.openView = function (data) {
        $state.go('home.viewdetail', {
            item_id: data.id,
            item_name: data.name,
        });
    }

    $scope.openAdjustement = function (data) {
        $state.go('home.adjustment', {
            item: data.code,
        });
    }


    $scope.openHistory = function (data) {
        $state.go('home.viewhistory', {
            item: data.code,
        });
    }

}]);
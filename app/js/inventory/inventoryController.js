angular.module('InventoryController', []).controller('InventoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des type customers";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Inventory": "inventory", };
    var vm = this;
    vm.appTitle = "Stock and inventory";

    $scope.viewstocks = [
        { code: "N02BE01", name: "Kipharma", min: "10", max: "10", avail: "10", phys: "50000" },
        { code: "N02BE01", name: "Kipharma", min: "10", max: "10", avail: "10", phys: "50000" },
        { code: "N02BE01", name: "Kipharma", min: "10", max: "10", avail: "10", phys: "50000" },
        { code: "N02BE01", name: "Kipharma", min: "10", max: "10", avail: "10", phys: "50000" },
        { code: "N02BE01", name: "Kipharma", min: "10", max: "10", avail: "10", phys: "50000" }
    ];

}]);
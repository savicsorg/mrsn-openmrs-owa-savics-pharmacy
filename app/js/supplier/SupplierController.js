angular.module('SupplierController', []).controller('SupplierController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des Suppliers";
    $scope.resource = "savicspharmcy/supplier";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Suppliers"] = "/suppliers";
    $rootScope.links["New"] = "/supplier";

    var vm = this;
    vm.appTitle = "New Supplier entry";
    vm.resource = "savicspharmcy/supplier";

}]);
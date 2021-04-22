angular.module('SuppliersController', []).controller('SuppliersController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des suppliers";
    $scope.resource = "savicspharmcy/suppliers";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Suppliers"] = "/suppliers";

    var vm = this;
    vm.appTitle = "Gestion des suppliers";
    vm.resource = "savicspharmcy/suppliers";

    //TODO replace this by real data comming from openmrsRest
    $scope.suppliers = [
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" }
    ];
}])
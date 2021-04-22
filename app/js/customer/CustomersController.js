angular.module('CustomersController', []).controller('CustomersController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des customers";
    $scope.resource = "savicspharmcy/customers";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Customers"] = "/customers";

    var vm = this;
    vm.appTitle = "Gestion des customers";
    vm.resource = "savicspharmcy/customers";

    //TODO replace this by real data comming from openmrsRest
    $scope.customers = [
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" },
        { code: "N02BE01", name: "Acetaminophen", address: "Tablet", tel: "oral", email: "2020-03-12" }
    ];



}])
angular.module('CustomerController', []).controller('CustomerController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des customers";
    $scope.resource = "savicspharmcy/customer";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Customers"] = "/customers";
    $rootScope.links["New"] = "/customer";

    var vm = this;
    vm.appTitle = "New customer entry";
    vm.resource = "savicspharmcy/customer";

}]);
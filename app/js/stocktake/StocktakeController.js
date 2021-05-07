angular.module('StocktakeController', []).controller('StocktakeController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des stocks";
    $scope.resource = "savicspharmcy/stock";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["stocks"] = "/stocks";
    $rootScope.links["New"] = "/stock";

    var vm = this;
    vm.appTitle = "New stock entry";
    vm.resource = "savicspharmcy/stock";

}]);
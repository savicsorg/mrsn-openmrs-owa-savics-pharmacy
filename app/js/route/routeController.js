angular.module('RouteController', []).controller('RouteController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des routes";
    $scope.resource = "savicspharmcy/route";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Routes"] = "/routes";
    $rootScope.links["New"] = "/route";

    var vm = this;
    vm.appTitle = "New route entry";
    vm.resource = "savicspharmcy/route";

}]);
angular.module('UnitController', []).controller('UnitController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des units";
    $scope.resource = "savicspharmcy/unit";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Units"] = "/units";
    $rootScope.links["New"] = "/unit";

    var vm = this;
    vm.appTitle = "New unit entry";
    vm.resource = "savicspharmcy/unit";

}]);
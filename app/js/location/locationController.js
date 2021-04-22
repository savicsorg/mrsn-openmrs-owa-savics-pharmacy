angular.module('LocationController', []).controller('LocationController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des locations";
    $scope.resource = "savicspharmcy/location";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Locations"] = "/locations";
    $rootScope.links["New"] = "/location";

    var vm = this;
    vm.appTitle = "New location entry";
    vm.resource = "savicspharmcy/location";

}]);
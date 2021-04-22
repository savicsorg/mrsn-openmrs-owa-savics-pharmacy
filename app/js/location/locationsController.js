angular.module('LocationsController', []).controller('LocationsController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des locations";
    $scope.resource = "savicspharmcy/locations";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Locations"] = "/locations";

    var vm = this;
    vm.appTitle = "Gestion des locations";
    vm.resource = "savicspharmcy/locations";

    //TODO replace this by real data comming from openmrsRest
    $scope.locations = [
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" }
    ];
}])
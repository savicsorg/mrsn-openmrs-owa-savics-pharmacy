angular.module('RoutesController', []).controller('RoutesController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des routes";
    $scope.resource = "savicspharmcy/routes";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Routes"] = "/routes";

    var vm = this;
    vm.appTitle = "Gestion des routes";
    vm.resource = "savicspharmcy/routes";

    //TODO replace this by real data comming from openmrsRest
    $scope.routes = [
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" }
    ];
}])
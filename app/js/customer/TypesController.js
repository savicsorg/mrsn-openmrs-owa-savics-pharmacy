angular.module('TypesController', []).controller('TypesController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des types";
    $scope.resource = "savicspharmcy/types";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Types"] = "/types";

    var vm = this;
    vm.appTitle = "Gestion des types";
    vm.resource = "savicspharmcy/types";

    //TODO replace this by real data comming from openmrsRest
    $scope.types = [
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" }
    ];
}])
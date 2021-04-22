angular.module('UnitsController', []).controller('UnitsController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des units";
    $scope.resource = "savicspharmcy/units";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Units"] = "/units";

    var vm = this;
    vm.appTitle = "Gestion des units";
    vm.resource = "savicspharmcy/units";

    //TODO replace this by real data comming from openmrsRest
    $scope.units = [
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" },
        { code: "N02BE01", name: "Acetaminophen" }
    ];
}])
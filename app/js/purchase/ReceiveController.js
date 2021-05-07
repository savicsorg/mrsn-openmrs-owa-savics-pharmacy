angular.module('ReceiveController', []).controller('ReceiveController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des Receives";
    $scope.resource = "savicspharmcy/receives";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Receives"] = "/receives";

    var vm = this;
    vm.appTitle = "Gestion des Receives";
    vm.resource = "savicspharmcy/receives";

    //TODO replace this by real data comming from openmrsRest
    $scope.receives = [
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" }
    ];



}]);
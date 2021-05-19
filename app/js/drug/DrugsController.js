angular.module('DrugsController', []).controller('DrugsController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmcy/drugs";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Drugs"] = "/drugs";

    var vm = this;
    vm.appTitle = "Gestion des Drugs";
    vm.resource = "savicspharmcy/drugs";

    //TODO replace this by real data comming from openmrsRest
    $scope.drugs = [
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" }
    ];

    $scope.openView = function () {
        $state.go('home.drug', {});
    }

}]);
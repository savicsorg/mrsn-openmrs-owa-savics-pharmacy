angular.module('DrugsController', []).controller('DrugsController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des Drugs";
    $scope.resource = "savicsgmao/drugs";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Drugs"] = "/drugs";

    var vm = this;
    vm.appTitle = "Gestion des Drugs";
    vm.resource = "savicsgmao/drugs";

    //TODO replace this by real data comming from openmrsRest
    $scope.drugs = [
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" },
        { code: "N02BE01", designation: "Acetaminophen", unit: "Tablet", route: "oral", lastModified: "2020-03-12" }
    ];

    

}]);
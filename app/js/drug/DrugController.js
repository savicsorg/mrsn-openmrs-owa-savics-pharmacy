angular.module('DrugController', []).controller('DrugController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmcy/drug";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Drugs"] = "/drugs";
    $rootScope.links["New"] = "/drug";

    var vm = this;
    vm.appTitle = "New Drug entry";
    vm.resource = "savicspharmcy/drug";
    vm.drugTypes = [
        { drug_type_id: "1", name: "Box" },
        { drug_type_id: "2", name: "Tablets" },
        { drug_type_id: "3", name: "Capsules" },
        { drug_type_id: "4", name: "Enrob tablets" },
        { drug_type_id: "5", name: "Flacon" },
        { drug_type_id: "6", name: "Sachets" },
        { drug_type_id: "7", name: "Platelets" }
    ];

    vm.routes = [
        { drug_route_id: "1", name: "Mouth" },
        { drug_route_id: "2", name: "Cutanée" },
        { drug_route_id: "3", name: "IV" },
        { drug_route_id: "4", name: "Ocular" },
        { drug_route_id: "5", name: "Rectal" },
        { drug_route_id: "6", name: "Vaginal" }
    ];

}]);
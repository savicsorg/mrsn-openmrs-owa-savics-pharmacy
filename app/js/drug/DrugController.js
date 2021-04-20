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

}]);
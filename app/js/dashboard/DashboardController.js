angular.module('DashboardController', []).controller('DashboardController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmcy/";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "" };

    var vm = this;
    vm.appTitle = "Gestion des Drugs";
    vm.resource = "savicspharmcy/";

}]);
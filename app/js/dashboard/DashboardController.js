angular.module('DashboardController', []).controller('DashboardController', ['$scope', '$rootScope', '$window', 'openmrsRest', function ($scope, $rootScope, $window, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmcy/";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "" };

    var vm = this;
    vm.appTitle = "Gestion des Drugs";
    vm.resource = "savicspharmcy/";
    //$window.location.reload(); @aissa: Can only be reenabled once angular loop has been resolved
}]);
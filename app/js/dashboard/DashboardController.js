angular.module('DashboardController', []).controller('DashboardController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    
    $scope.myAgents = [{}];
    $scope.appTitle = "Gestion des equipements";
    $scope.resource = "savicsgmao/drug";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";

    
    
}]);
angular.module('MaintenanceController', []).controller('MaintenanceController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    
    console.log("MaintenanceController new form ---")
    $scope.myAgents = [{}];
    $scope.appTitle = "Gestion des maintenances";
    $scope.resource = "savicsgmao/agent";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Maintenance"] = "/maintenance";
    
    loadAgents();

    function loadAgents() {
        openmrsRest.getFull("savicsgmao/agent").then(function (response) {
            $scope.showLoading = false;
            $scope.agents = response.results;
        })
    }
}]);

angular.module('OperationController', []).controller('OperationController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    
    console.log("OperationController new form ---")
    $scope.myAgents = [{}];
    $scope.appTitle = "Gestion des operations";
    $scope.resource = "savicsgmao/agent";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Operations"] = "/operations";
    
    loadAgents();

    function loadAgents() {
        openmrsRest.getFull("savicsgmao/agent").then(function (response) {
            $scope.showLoading = false;
            $scope.agents = response.results;
        })
    }
}]);

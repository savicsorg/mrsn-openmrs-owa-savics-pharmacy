
AgentsController.$inject = ['$scope', '$rootScope', 'openmrsRest'];

export default function AgentsController($scope, $rootScope, openmrsRest) {
    console.log("EquipementsController ---")
    $scope.myAgents = [{}];
    $scope.appTitle = "Gestion des equipements";
    $scope.resource = "savicsgmao/agent";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Agents"] = "/agents";
    
    loadAgents();

    function loadAgents() {
        openmrsRest.getFull("savicsgmao/agent").then(function (response) {
            $scope.showLoading = false;
            $scope.agents = response.results;
        })
    }

    

}


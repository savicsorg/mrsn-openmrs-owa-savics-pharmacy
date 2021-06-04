angular.module('DrugViewController', []).controller('DrugViewController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmacy";
    $scope.concept_ressource = "concept";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Drugs": "drugs", "View": "drug" };

    var vm = this;
    vm.appTitle = "View Drug";

    vm.drug = $stateParams;
    console.log(vm.drug);

}]);
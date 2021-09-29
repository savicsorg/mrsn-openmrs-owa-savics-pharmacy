angular.module('OrderViewController', []).controller('OrderViewController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des commandes";
    $scope.resource = "savicspharmacy";
    $scope.concept_ressource = "concept";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy Management Module": "", "Orders": "orders", "View": "order" };

    var vm = this;
    vm.appTitle = "View Order";

    vm.order = $stateParams;
    openmrsRest.getFull($scope.resource + "/orderDetail?orderId=" + vm.order.id).then(function (response) {
        vm.order.lines = response.results;
    }, function (e) {
        $scope.loading = false;
        showToast("An unexpected error has occured.", "error");
    });
}]);
angular.module('OrderViewController', []).controller('OrderViewController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des commandes";
    $scope.resource = "savicspharmacy";
    $scope.concept_ressource = "concept";
    var orderTitle = $translate.instant("Orders");
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Orders": "orders", "View": "order" };

    var vm = this;
    vm.appTitle = $translate.instant("View Order");

    vm.order = $stateParams;
    openmrsRest.getFull($scope.resource + "/orderDetail?orderId=" + vm.order.id).then(function (response) {
        vm.order.lines = response.results;
    }, function (e) {
        $scope.loading = false;
        showToast($translate.instant("An unexpected error has occured."), "error");
    });
}]);
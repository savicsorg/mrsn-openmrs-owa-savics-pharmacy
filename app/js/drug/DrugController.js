angular.module('DrugController', []).controller('DrugController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des Drugs";
    $scope.resource = "savicsgmao/drug";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Drug"] = "/drug";

    var vm = this;
    vm.appTitle = "Gestion des Drugs";
    vm.resource = "savicsgmao/drug";

}]);
angular.module('DispenseController', []).controller('DispenseController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.resource = "savicspharmcy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Dispense": "dispense" };

    $scope.sending = { customer: {}, person: {} };
    $scope.dispenseMode = 1;

}]);
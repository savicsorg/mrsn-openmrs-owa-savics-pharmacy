angular.module('TypeController', []).controller('TypeController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des types";
    $scope.resource = "savicspharmcy/type";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Types"] = "/types";
    $rootScope.links["New"] = "/type";

    var vm = this;
    vm.appTitle = "New type entry";
    vm.resource = "savicspharmcy/type";

}]);
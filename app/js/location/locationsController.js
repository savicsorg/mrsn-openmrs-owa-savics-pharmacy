angular.module('LocationsController', ['ngMaterial', 'md.data.table']).controller('LocationsController', ['$scope', '$state', '$rootScope', 'openmrsRest', function ($scope, $state, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des locations";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Location": "locations" };

    var vm = this;
    vm.appTitle = "Gestion des locations";

    $scope.getAllLocation = function () {
        openmrsRest.getFull($scope.resource + "/location").then(function (response) {
            if (response.results.length >= 1) {
                $scope.locations = response.results;
            }
        })
    }

    $scope.getAllLocation();

    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: true,
        pageSelector: true,
        rowSelection: true
    };

    $scope.query = {
        limit: 5,
        page: 1
    };

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    }

    $scope.openEdit = function (data) {
        $state.go('home.location', { code: data.code, name: data.name, id: data.id });

    }

}])
angular.module('UnitsController', ['ngMaterial', 'md.data.table']).controller('UnitsController', ['$scope', '$state', '$rootScope', 'openmrsRest', function ($scope, $state, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des units";
    $scope.resource = "savicspharmacy/";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Unit": "units"};

    var vm = this;
    vm.appTitle = "Gestion des types";

    $scope.getAllUnit = function () {
        openmrsRest.getFull($scope.resource + "/unit").then(function (response) {
            if (response.results.length >= 1) {
                $scope.units = response.results;
            }
        })
    }

    $scope.getAllUnit();

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
        $state.go('home.unit', { code: data.code, name: data.name, id: data.id });

    }

}])
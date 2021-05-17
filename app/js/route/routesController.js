angular.module('RoutesController', []).controller('RoutesController', ['$scope', '$state', '$rootScope', 'openmrsRest', function ($scope, $state, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des routes";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties

    var vm = this;
    vm.appTitle = "Gestion des routes";

    $scope.getAllRoute = function () {
        openmrsRest.getFull($scope.resource + "/route").then(function (response) {
            if (response.results.length >= 1) {
                $scope.routes = response.results;
            }
        })
    }

    $scope.getAllRoute();

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
        $state.go('home.route', { code: data.code, name: data.name, id: data.id });
    }

}])
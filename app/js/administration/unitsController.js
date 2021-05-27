angular.module('UnitsController', ['ngMaterial', 'md.data.table']).controller('UnitsController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des units";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Unit": "units" };

    var vm = this;
    vm.appTitle = "Gestion des types";

    $scope.getAllUnit = function () {
        $scope.units = [];
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
        $state.go('home.unit', { code: data.code, name: data.name, uuid: data.uuid });

    }

    $scope.delete = function (uuid) {
        openmrsRest.remove($scope.resource + "/unit", uuid, "Reason for deletion").then(function (response) {
            console.log(response);
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAllUnit();
        }).catch(function (e) {
            type = "error";
            msg = e.data.error.message;
            showToast(msg, type);
        });
    }

    function showToast(msg, type) {
        $mdToast.show(
            $mdToast.simple()
                .content(msg)
                .theme(type + "-toast")
                .position('top right')
                .hideDelay(3000))
            .then(function () {
                $log.log('Toast dismissed.');
            }).catch(function () {
                $log.log('Toast failed or was forced to close early by another toast.');
            });
    }

}])
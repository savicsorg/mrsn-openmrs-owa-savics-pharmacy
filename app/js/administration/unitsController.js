angular.module('UnitsController', ['ngMaterial', 'md.data.table']).controller('UnitsController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $rootScope, $mdToast, openmrsRest, $mdDialog) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des units";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Unit": "units" };

    var vm = this;
    vm.appTitle = "Gestion des types";

    var type = "";
    var msg = "";

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
        rowSelection: true,
        limit: [5, 10, 50, 100]
    };

    $scope.query = {
        limit: 5,
        page: 1,
        order: '-date'
    };

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    }

    $scope.openEdit = function (data) {
        $state.go('home.unit', { code: data.code, name: data.name, uuid: data.uuid });

    }

    $scope.delete = function (obj) {
        openmrsRest.remove($scope.resource + "/unit", obj, "Reason for deletion").then(function (response) {
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

    $scope.showConfirm = function (ev, obj) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your data?')
            .textContent('If you choose `Yes` this record will be deleted and you will not be able to recover it')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.delete(obj);
        }, function () {
            $mdDialog.cancel();
        });
    };

    $scope.showConfirm = function (ev, obj) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your data?')
            .textContent('If you choose `Yes` this record will be deleted and you will not be able to recover it')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.delete(obj);
        }, function () {
            $mdDialog.cancel();
        });
    };

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

    $scope.search = function (row) {
        return (angular.lowercase(row.name).indexOf($scope.searchAll || '') !== -1 || angular.lowercase(row.code).indexOf($scope.searchAll || '') !== -1);
    };

}])
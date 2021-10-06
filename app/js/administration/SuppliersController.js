angular.module('SuppliersController', ['ngMaterial', 'md.data.table']).controller('SuppliersController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', '$translate', function ($scope, $state, $rootScope, $mdToast, openmrsRest, $mdDialog, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des suppliers";
    $scope.resource = "savicspharmacy";
    $scope.loading = false;
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Suppliers": "Suppliers" };

    var vm = this;
    vm.appTitle = "Gestion des suppliers";

    var type = "";
    var msg = "";

    $scope.getAllSupplier = function () {
        $scope.suppliers = [];
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/supplier").then(function (response) {
            $scope.loading = false;
            if (response.results.length >= 1) {
                $scope.suppliers = response.results;
            }
        }, function (e) {
            $scope.loading = false;
            showToast($translate.instant("An unexpected error has occured."), "error");
        })
    }

    $scope.getAllSupplier();

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
        $state.go('home.supplier', { code: data.code, name: data.name, address: data.address, email: data.email, tel: data.tel, uuid: data.uuid });
    }

    $scope.delete = function (supplier) {
        openmrsRest.remove($scope.resource + "/supplier", supplier, "Reason for deletion").then(function (response) {
            console.log(response);
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAllSupplier();
        }).catch(function (e) {
            type = "error";
            msg = e.data.error.message;
            showToast(msg, type);
        });
    }

    $scope.showConfirm = function (ev, obj) {
        var confirm = $mdDialog.confirm()
            .title($translate.instant('Would you like to delete your data?'))
            .textContent($translate.instant('If you choose `Yes` this record will be deleted and you will not be able to recover it'))
            .ariaLabel($translate.instant('Lucky day'))
            .targetEvent(ev)
            .ok($translate.instant('Yes'))
            .cancel($translate.instant('Cancel'));
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
                $log.log($translate.instant('Toast dismissed.'));
            }).catch(function () {
                $log.log($translate.instant('Toast failed or was forced to close early by another toast.'));
            });
    }
}])
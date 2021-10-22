angular.module('LocationsController', ['ngMaterial', 'md.data.table']).controller('LocationsController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', '$translate',function ($scope, $state, $rootScope, $mdToast, openmrsRest, $mdDialog, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des locations";
    $scope.resource = "savicspharmacy";
    $scope.loading = false;
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Location": "locations" };
    $scope.label = {
        page: $translate.instant("Page")  + $translate.instant(":"),
        rowsPerPage: $translate.instant("Rows per page") + $translate.instant(":"),
        of: $translate.instant("of")
    }

    var vm = this;
    vm.appTitle = "Gestion des locations";

    var type = "";
    var msg = "";

    $scope.getAllLocation = function () {
        $scope.locations = [];
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/location").then(function (response) {
            $scope.loading = false;
            if (response.results.length >= 1) {
                $scope.locations = response.results;
            }
        }, function (e) {
            $scope.loading = false;
            showToast($translate.instant("An unexpected error has occured."), "error");
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
        $state.go('home.location', { code: data.code, name: data.name, uuid: data.uuid });
    }

    $scope.delete = function (obj) {
        openmrsRest.remove($scope.resource + "/location", obj, "remove " + obj.id).then(function (response) {
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAllLocation();
        }, function (e) {
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
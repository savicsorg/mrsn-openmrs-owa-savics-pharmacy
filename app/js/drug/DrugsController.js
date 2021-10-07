angular.module('DrugsController', ['ngMaterial', 'md.data.table']).controller('DrugsController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmacy";
    $scope.loading = false;
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Drugs": "drugs" };

    var vm = this;
    vm.appTitle = "Gestion des drugs";

    var type = "";
    var msg = "";

    $scope.getAllDrug = function () {
        $scope.loading = true;
        $scope.drugs = [];
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            $scope.loading = false;
            if (response.results.length >= 1) {
                $scope.drugs = response.results;
            }
        }, function (e) {
            $scope.loading = false;
            showToast($translate.instant("An unexpected error has occured."), "error");
        });
    }

    $scope.getAllDrug();

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
        $state.go('home.drug', {
            code: data.code,
            name: data.name,
            uuid: data.uuid,
            description: data.description,
            route: data.route,
            unit: data.unit,
            sellPrice: data.sellPrice,
            buyPrice: data.buyPrice,
            soh: data.soh,
            virtualstock: data.virtualstock,
            stockMax: data.stockMax,
            stockMin: data.stockMin
        });
    }

    $scope.openView = function (data) {
        $state.go('home.drugview', {
            code: data.code,
            name: data.name,
            description: data.description,
            route: data.route,
            unit: data.unit,
            sellPrice: data.sellPrice,
            buyPrice: data.buyPrice,
            soh: data.soh,
            virtualstock: data.virtualstock,
            stockMax: data.stockMax,
            stockMin: data.stockMin
        });
    }

    $scope.delete = function (obj) {
        openmrsRest.remove($scope.resource + "/item", obj, "Reason for deletion").then(function (response) {
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAllDrug();
        }).catch(function (e) {
            type = "error";
            msg = e.data.error.message;
            
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .title($translate.instant('Database constraint violation'))
                    .clickOutsideToClose(true)
                    .textContent($scope.pageTitle = $translate.instant('You cannot delete a drug that has existing batches.'))
                    .ok('Ok')
            );
            //showToast(msg, type);
        });
    }


    $scope.showConfirm = function (ev, obj) {
        var confirm = $mdDialog.confirm()
            .title($translate.instant('Would you like to delete your data?'))
            .textContent($translate.instant('If you choose `Yes` this record will be deleted and you will not be able to recover it'))
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
                $log.log($translate.instant('Toast dismissed.'));
            }).catch(function () {
                $log.log($translate.instant('Toast failed or was forced to close early by another toast.'));
            });
    }

    $scope.donwload = function () {
        let link = window.location.protocol + "//" + window.location.host + "/openmrs/ws/rest/v1/savicspharmacy/items/export";
        localStorage.setItem("export_link", link);
        window.location = link;
    }

}]);
angular.module('DrugsController', ['ngMaterial', 'md.data.table']).controller('DrugsController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Drugs": "drugs" };

    var vm = this;
    vm.appTitle = "Gestion des drugs";

    var type = "";
    var msg = "";

    $scope.getAllDrug = function () {
        $scope.drugs = [];
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            if (response.results.length >= 1) {
                $scope.drugs = response.results;
            }
        })
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

    $scope.delete = function (uuid) {
        openmrsRest.remove($scope.resource + "/item", uuid, "Reason for deletion").then(function (response) {
            console.log(response);
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAlldrug();
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



}]);
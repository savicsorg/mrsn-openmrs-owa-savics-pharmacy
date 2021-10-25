angular.module('AddNewbatchController', []).controller('AddNewbatchController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = $translate.instant("Add New batch");
    $scope.resource = "savicspharmacy";
    $scope.item_id = $stateParams.item_id;
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "AddNewbatch": "AddNewbatch" };
    var vm = this;
    vm.appTitle = $translate.instant("Add New batch");

    var type = "";
    var msg = "";

    $scope.batch = function () {
        if (!vm.batch || !vm.batch.itemBatch || !vm.batch.pharmacyLocation || !vm.batch.itemVirtualstock || !vm.batch.itemExpiryDate) {
            type = "error";
            msg = $translate.instant("Please check if your input are valid ones.")
            showToast(msg, type);
            return;
        }
        vm.batch.item = parseInt($stateParams.item_id);
        vm.batch.itemSoh = vm.batch.itemVirtualstock;
        vm.batch.transactionType = 3;
        vm.batch.transactionTypeId = 3;
        vm.batch.transactionTypeCode = "bcreate";
        document.getElementById("loading_submit").style.visibility = "visible";
        var payload = vm.batch;
        openmrsRest.create($scope.resource + "/itemsLine", payload).then(function (response) {
            handleResponse(response)
        }).catch(function (e) {
            handleResponse(response, e)
        });
    }

    $scope.locations = function () {
        openmrsRest.getFull($scope.resource + "/location").then(function (response) {
            vm.locations = response.results;
        });
    }

    $scope.locations();

    $scope.returnToPrevious = function () {
        if ($scope.item_id) { //for parameters with three ids
            $state.go('home.viewdetail', { id: $scope.item_id });
        }
    }

    function handleResponse(response, e = null) {
        document.getElementById("loading_submit").style.visibility = "hidden";
        if (e) {
            type = "error";
            msg = e.data.error.message;
            showToast(msg, type);
            return;
        }
        if (response.uuid) {
            type = "success";
            msg = response.itemBatch + $translate.instant(" is Well saved.");
        } else {
            type = "error";
            msg = $translate.instant("we can't save your data.");
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.viewdetail', {
                item: $stateParams.item,
                id: $stateParams.item_id
            });
        }
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

}]);
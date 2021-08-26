angular.module('AddNewbatchController', []).controller('AddNewbatchController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Add New batch";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "AddNewbatch": "AddNewbatch" };
    var vm = this;
    vm.appTitle = "Add New batch";

    var type = "";
    var msg = "";

    $scope.batch = function () {
        if (!vm.batch || !vm.batch.itemBatch || !vm.batch.pharmacyLocation || !vm.batch.itemVirtualstock || !vm.batch.itemExpiryDate) {
            type = "error";
            msg = "Please check if your input are valid ones."
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
        console.log(payload);
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
            msg = response.itemBatch + " is Well saved.";
        } else {
            type = "error";
            msg = "we can't save your data.";
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
                $log.log('Toast dismissed.');
            }).catch(function () {
                $log.log('Toast failed or was forced to close early by another toast.');
            });
    }

}]);
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
        if (!vm.batch || !vm.batch.item_batch || !vm.batch.location_id || !vm.batch.item_virtualstock || !vm.batch.expiry_date) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        vm.batch.item_id = 0;
        vm.batch.item_soh = vm.batch.item_virtualstock;
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
            msg = $stateParams.uuid ? response.name + " is Well edited." : response.name + " is Well saved.";
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.drugs')
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
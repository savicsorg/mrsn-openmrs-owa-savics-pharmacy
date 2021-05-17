angular.module('UnitController', []).controller('UnitController', ['$scope', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des types";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Unit": "units", "New": "unit" };


    var vm = this;
    vm.appTitle = "New type entry";

    if ($stateParams.id) {
        //we are in edit mode
        vm.unit = $stateParams;
        vm.appTitle = "Edit type entry";
    }

    $scope.unit = function () {
        var type = "";
        var msg = "";
        if (!vm.unit || !vm.unit.code || !vm.unit.name) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = vm.unit.id ? { name: vm.unit.name, code: vm.unit.code, id: vm.unit.id } : { name: vm.unit.name, code: vm.unit.code };

        openmrsRest.create($scope.resource + "/unit", payload).then(function (response) {
            document.getElementById("loading_submit").style.visibility = "hidden";
            if (response.id) {
                type = "success";
                msg = response.name + " is Well saved.";
                vm.unit.name = "";
                vm.unit.code = "";
            } else {
                type = "error";
                msg = "we can't save your data.";
            }
            showToast(msg, type);
        }).catch(function (e) {
            document.getElementById("loading_submit").style.visibility = "hidden";
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

}]);
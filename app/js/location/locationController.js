angular.module('LocationController', []).controller('LocationController', ['$scope', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des locations";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Locations": "locations", "New": "location" };


    var vm = this;
    vm.appTitle = "New location entry";

    if ($stateParams.id) {
        //we are in edit mode
        vm.location = $stateParams;
        vm.appTitle = "Edit type entry";
    }

    $scope.location = function () {
        var type = "";
        var msg = "";
        if (!vm.location || !vm.location.code || !vm.location.name) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = vm.location.id ? { name: vm.location.name, code: vm.location.code, id: vm.location.id } : { name: vm.location.name, code: vm.location.code };

        openmrsRest.create($scope.resource + "/location", payload).then(function (response) {
            document.getElementById("loading_submit").style.visibility = "hidden";
            if (response.id) {
                type = "success";
                msg = response.name + " is Well saved.";
                vm.location.name = "";
                vm.location.code = "";
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
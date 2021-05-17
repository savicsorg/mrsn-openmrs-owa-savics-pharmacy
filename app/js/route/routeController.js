angular.module('RouteController', []).controller('RouteController', ['$scope', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des routes";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Route": "routes", "New": "route" };

    var vm = this;
    vm.appTitle = "New route entry";

    if ($stateParams.id) {
        //we are in edit mode
        vm.route = $stateParams;
        vm.appTitle = "Edit type entry";
    }

    $scope.route = function () {
        var type = "";
        var msg = "";
        if (!vm.route || !vm.route.code || !vm.route.name) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = vm.route.id ? { name: vm.route.name, code: vm.route.code, id: vm.route.id } : { name: vm.route.name, code: vm.route.code };

        openmrsRest.create($scope.resource + "/route", payload).then(function (response) {
            document.getElementById("loading_submit").style.visibility = "hidden";
            if (response.id) {
                type = "success";
                msg = response.name + " is Well saved.";
                vm.route.name = "";
                vm.route.code = "";
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
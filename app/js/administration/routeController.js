angular.module('RouteController', []).controller('RouteController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des routes";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Route": "routes", "New": "route" };

    var vm = this;
    vm.appTitle = $translate.instant("New route entry");

    var type = "";
    var msg = "";

    if ($stateParams.uuid) {
        //we are in edit mode
        vm.route = $stateParams;
        vm.appTitle = $translate.instant("Edit type entry");
    }

    $scope.route = function () {

        if (!vm.route || !vm.route.code || !vm.route.name) {
            type = "error";
            msg = $translate.instant("Please check if your input are valid ones.")
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = $stateParams.uuid ? { name: vm.route.name, code: vm.route.code, uuid: vm.route.uuid } : { name: vm.route.name, code: vm.route.code };

        if ($stateParams.uuid) {
            openmrsRest.update($scope.resource + "/route", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
        } else {
            openmrsRest.create($scope.resource + "/route", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
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
            msg = $stateParams.uuid ? response.name + $translate.instant(" is Well edited.") : response.name + $translate.instant(" is Well saved.");
            vm.route.name = "";
            vm.route.code = "";
        } else {
            type = "error";
            msg = $translate.instant("we can't save your data.");
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.routes')
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
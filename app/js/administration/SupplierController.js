angular.module('SupplierController', []).controller('SupplierController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des Suppliers";
    $scope.resource = "savicspharmacy"
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Suppliers": "suppliers", "New": "supplier" };
    var vm = this;
    vm.appTitle = "New Supplier entry";

    var type = "";
    var msg = "";

    if ($stateParams.uuid) {
        //we are in edit mode
        vm.supplier = $stateParams;
        vm.appTitle = "Edit type entry";
    }

    $scope.supplier = function () {

        if (!vm.supplier || !vm.supplier.code || !vm.supplier.name || !vm.supplier.address || !vm.supplier.email || !vm.supplier.tel) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = $stateParams.uuid ? { name: vm.supplier.name, code: vm.supplier.code, address: vm.supplier.address, email: vm.supplier.email, tel: vm.supplier.tel, uuid: vm.supplier.uuid } : { name: vm.supplier.name, code: vm.supplier.code, address: vm.supplier.address, email: vm.supplier.email, tel: vm.supplier.tel };

        if ($stateParams.uuid) {
            openmrsRest.update($scope.resource + "/supplier", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
        } else {
            openmrsRest.create($scope.resource + "/supplier", payload).then(function (response) {
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
            msg = $stateParams.uuid ? response.name + " is Well edited." : response.name + " is Well saved.";
            vm.supplier.name = "";
            vm.supplier.code = "";
            vm.supplier.address = "";
            vm.supplier.email = "";
            vm.supplier.tel = "";
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.suppliers')
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
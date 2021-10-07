angular.module('CustomerController', []).controller('CustomerController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = $translate.instant("Customer management");
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Customers": "customers", "New": "customer" };
    var vm = this;
    vm.appTitle = $translate.instant("New customer entry");

    var type = "";
    var msg = "";

    if ($stateParams.uuid) {
        //we are in edit mode
        vm.customer = $stateParams;
        $scope.customer_type_id = vm.customer.customer_type_id.id;
        vm.appTitle = $translate.instant("Edit type entry");
    }

    $scope.customer = function () {
        if (!vm.customer || !vm.customer.code || !vm.customer.name || !vm.customer.address || !vm.customer.email || !vm.customer.tel || !vm.customer.type.id) {
            type = "error";
            msg = $translate.instant("Please check if your input are valid ones.")
            showToast(msg, type);
            return;
        }

        if (!Regvalidate("email", vm.customer.email)) {
            type = "error";
            msg = $translate.instant("Please check if your email is a valid one.");
            showToast(msg, type);
            return;
        }
        if (!Regvalidate("phone", vm.customer.tel)) {
            type = "error";
            msg = $translate.instant("Please check if your phone number is a valid one.");
            showToast(msg, type);
            return;
        }

        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = $stateParams.uuid ? { name: vm.customer.name, code: vm.customer.code, address: vm.customer.address, email: vm.customer.email, customerType: vm.customer.type.id, tel: vm.customer.tel, uuid: vm.customer.uuid } : { name: vm.customer.name, code: vm.customer.code, address: vm.customer.address, email: vm.customer.email, tel: vm.customer.tel, customerType: vm.customer.type.id };

        if ($stateParams.uuid) {
            openmrsRest.update($scope.resource + "/customer", payload).then(function (response) {
                handleResponse(response);
            }).catch(function (e) {
                handleResponse(response, e)
            });
        } else {
            openmrsRest.create($scope.resource + "/customer", payload).then(function (response) {
                handleResponse(response);
                $stateParams.uuid = null;
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
            vm.customer.name = "";
            vm.customer.code = "";
            vm.customer.address = "";
            vm.customer.email = "";
            vm.customer.tel = "";
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.customers')
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


    function Regvalidate(type, value) {
        if (type == "email") {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
        else {
            const re = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
            return re.test(String(value).toLowerCase());
        }
    }

    $scope.customertype = function () {
        openmrsRest.getFull($scope.resource + "/customerType").then(function (response) {
            vm.customertypes = response.results;
        });
    }

    $scope.customertype();

}]);
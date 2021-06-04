angular.module('CustomersController', ['ngMaterial', 'md.data.table']).controller('CustomersController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des customers";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Customers": "customers" };

    var vm = this;
    vm.appTitle = "Gestion des customers";

    $scope.getAllCustomer = function () {
        $scope.customers = [];
        openmrsRest.getFull($scope.resource + "/customer").then(function (response) {
            if (response.results.length >= 1) {
                $scope.customers = response.results;
            }
        })
    }

    $scope.getAllCustomer();

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
        $state.go('home.customer', { code: data.code, name: data.name, address: data.address, email: data.email, tel: data.tel, customer_type_id: data.customer_type_id, uuid: data.uuid });
    }

    $scope.delete = function (uuid) {
        openmrsRest.remove($scope.resource + "/customer", uuid, "Reason for deletion").then(function (response) {
            console.log(response);
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAllCustomer();
        }).catch(function (e) {
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

}])
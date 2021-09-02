angular.module('CustomersController', ['ngMaterial', 'md.data.table']).controller('CustomersController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $rootScope, $mdToast, openmrsRest, $mdDialog) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des customers";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Customers": "customers" };

    var vm = this;
    vm.appTitle = "Gestion des customers";

    var type = "";
    var msg = "";

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
        rowSelection: true,
        limit: [5, 10, 50, 100]
    };

    $scope.query = {
        limit: 5,
        page: 1,
        order: '-date'
    };

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    }

    $scope.openEdit = function (data) {
        $state.go('home.customer', { code: data.code, name: data.name, address: data.address, email: data.email, tel: data.tel, customer_type_id: data.customerType, uuid: data.uuid });
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

    $scope.showConfirm = function (ev, obj) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your data?')
            .textContent('If you choose `Yes` this record will be deleted and you will not be able to recover it')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.delete(obj);
        }, function () {
            $mdDialog.cancel();
        });
    };

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

    $scope.search = function (row) {
        return (angular.lowercase(row.name).indexOf($scope.searchAll || '') !== -1 || angular.lowercase(row.code).indexOf($scope.searchAll || '') !== -1);
    };

}])
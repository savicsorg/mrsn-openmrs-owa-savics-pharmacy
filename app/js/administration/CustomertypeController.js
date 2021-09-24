angular.module('CustomertypeController', []).controller('CustomertypeController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des type customers";
    $scope.resource = "savicspharmacy";
    $scope.loading = false;
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Customertype": "customer type", "New": "customer type" };
    var vm = this;
    vm.appTitle = "New type entry";

    var type = "";
    var msg = "";

    if ($stateParams.uuid) {
        //we are in edit mode
        vm.customertype = $stateParams;
        vm.appTitle = "Edit type entry";
    }

    $scope.customertype = function () {

        if (!vm.customertype || !vm.customertype.name) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = $stateParams.uuid ? { name: vm.customertype.name, uuid: vm.customertype.uuid } : { name: vm.customertype.name };

        if ($stateParams.uuid) {
            openmrsRest.update($scope.resource + "/customerType", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
        } else {
            openmrsRest.create($scope.resource + "/customerType", payload).then(function (response) {
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
            vm.customertype.name = "";
            $scope.getAllCustomertype();
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.customertype')
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

    $scope.getAllCustomertype = function () {
        $scope.customertypes = [];
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/customerType").then(function (response) {
            $scope.loading = false;
            if (response.results.length >= 1) {
                $scope.customertypes = response.results;
            }
        }, function (e) {
            $scope.loading = false;
            showToast("An unexpected error has occured.", "error");
        })
    }

    $scope.getAllCustomertype();

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
        $state.go('home.customertype', { name: data.name, uuid: data.uuid });
    }

    $scope.delete = function (uuid) {
        openmrsRest.remove($scope.resource + "/customerType", uuid, "Reason for deletion").then(function (response) {
            console.log(response);
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getAllCustomertype();
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
}]);
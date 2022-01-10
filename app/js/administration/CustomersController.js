angular.module('CustomersController', ['ngMaterial', 'md.data.table']).controller('CustomersController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', '$translate', '$q', function ($scope, $state, $rootScope, $mdToast, openmrsRest, $mdDialog, $translate, $q) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Gestion des customers";
        $scope.resource = "savicspharmacy";
        $scope.loading = false;
        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "Customers": "customers"};
        $scope.label = {
            page: $translate.instant("Page") + $translate.instant(":"),
            rowsPerPage: $translate.instant("Rows per page") + $translate.instant(":"),
            of: $translate.instant("of")
        }
        var vm = this;
        vm.appTitle = "Gestion des customers";

        var type = "";
        var msg = "";


        $scope.query = {
            limit: 50,
            page: 1,
            startIndex: 0,
            count: 0
        };

        $scope.getAllCustomer = function () {
            $scope.loading = true;
            $scope.customers = [];
            var deferred = $q.defer();
            $scope.promise = deferred.promise;
            $scope.query.startIndex = $scope.query.limit * ($scope.query.page - 1);
            openmrsRest.getFull($scope.resource + "/customer?limit=" + $scope.query.limit + "&startIndex=" + $scope.query.startIndex).then(function (response) {
                $scope.loading = false;
                if (response.results.length >= 1) {
                    $scope.customers = response.results;
                    $scope.drugs = response.results;

                }
                openmrsRest.get($scope.resource + "/customer/count").then(function (response) {
                    if (response.count) {
                        $scope.query.count = response.count;
                    }
                    $rootScope.kernel.loading = 100;
                    deferred.resolve(response.results);
                }, function (e) {
                    $scope.loading = false;
                    showToast($translate.instant("An unexpected error has occured."), "error");
                });
            }, function (e) {
                $scope.loading = false;
                showToast($translate.instant("An unexpected error has occured."), "error");
            });
        }

        $scope.getAllCustomer();

        $scope.options = {
            autoSelect: true,
            boundaryLinks: false,
            largeEditDialog: true,
            pageSelector: true,
            rowSelection: true
        };


        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        }

        $scope.openEdit = function (data) {
            $state.go('home.customer', {code: data.code, name: data.name, address: data.address, email: data.email, tel: data.tel, customer_type_id: data.customerType, uuid: data.uuid});
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
                    .title($translate.instant('Would you like to delete your data?'))
                    .textContent($translate.instant('If you choose `Yes` this record will be deleted and you will not be able to recover it'))
                    .ariaLabel($translate.instant('Lucky day'))
                    .targetEvent(ev)
                    .ok($translate.instant('Yes'))
                    .cancel($translate.instant('Cancel'));
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
                        $log.log($translate.instant('Toast dismissed.'));
                    }).catch(function () {
                $log.log($translate.instant('Toast failed or was forced to close early by another toast.'));
            });
        }
    }])
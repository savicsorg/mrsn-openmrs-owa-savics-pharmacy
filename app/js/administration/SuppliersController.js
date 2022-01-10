angular.module('SuppliersController', ['ngMaterial', 'md.data.table']).controller('SuppliersController', ['$scope', '$state', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', '$translate', '$q', function ($scope, $state, $rootScope, $mdToast, openmrsRest, $mdDialog, $translate, $q) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Gestion des suppliers";
        $scope.resource = "savicspharmacy";
        $scope.loading = false;
        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "Suppliers": "Suppliers"};
        $scope.label = {
            page: $translate.instant("Page") + $translate.instant(":"),
            rowsPerPage: $translate.instant("Rows per page") + $translate.instant(":"),
            of: $translate.instant("of")
        }

        var vm = this;
        vm.appTitle = "Gestion des suppliers";

        var type = "";
        var msg = "";
        
        $scope.query = {
            limit: 50,
            page: 1,
            startIndex: 0,
            count: 0
        };

        $scope.getAllSupplier = function () {
            $scope.suppliers = [];
            $scope.loading = true;
            var deferred = $q.defer();
            $scope.promise = deferred.promise;
            $scope.query.startIndex = $scope.query.limit * ($scope.query.page - 1);
            openmrsRest.getFull($scope.resource + "/supplier?limit=" + $scope.query.limit + "&startIndex=" + $scope.query.startIndex).then(function (response) {
                $scope.loading = false;
                if (response.results.length >= 1) {
                    $scope.suppliers = response.results;
                }
                openmrsRest.get($scope.resource + "/supplier/count").then(function (response) {
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
            })
        }

        $scope.getAllSupplier();

        $scope.options = {
            autoSelect: true,
            boundaryLinks: false,
            largeEditDialog: true,
            pageSelector: true,
            rowSelection: true
        };


        $scope.openEdit = function (data) {
            $state.go('home.supplier', {code: data.code, name: data.name, address: data.address, email: data.email, tel: data.tel, uuid: data.uuid});
        }

        $scope.delete = function (supplier) {
            openmrsRest.remove($scope.resource + "/supplier", supplier, "Reason for deletion").then(function (response) {
                console.log(response);
                type = "success";
                msg = "Deleted";
                showToast(msg, type);
                $scope.getAllSupplier();
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
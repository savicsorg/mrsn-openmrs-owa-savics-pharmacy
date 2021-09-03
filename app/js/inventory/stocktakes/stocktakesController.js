angular.module('stocktakesController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('stocktakesController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', '$mdDialog', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr, $mdDialog) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = { "Pharmacy management module": "", "Inventory": "index.html#!/inventory" };
    $scope.loading = false;
    $scope.stocktakes = [];
    $scope.stockAtRisOnly = false;

    $scope.getData = function () {
        $scope.loading = true;
        $scope.stocktakes = [];
        openmrsRest.getFull($scope.resource + "/itemsLine").then(function (response) {
            $scope.stocktakes = response.results.map((r) => {
                r.difference = r.itemVirtualstock - r.itemSoh;
                return r;
            });
            $scope.loading = false;
        }, function (e) {
            $scope.loading = false;
            toastr.error('An unexpected error has occured.', 'Error');
        });
    };

    $scope.getData();

    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: true,
        pageSelector: true,
        rowSelection: true
    };

    $scope.query = {
        limit: 10,
        page: 1
    };

    $scope.saveDifference = function (drug) {
        drug.difference = drug.itemVirtualstock - drug.itemSoh;
    }

    $scope.approve = function (drug) {
        $mdDialog.show($mdDialog.confirm()
            .title('Confirmation')
            .textContent('Do you really want to approve this stock ?')
            .ok('Yes')
            .cancel('Cancel')).then(function () {
                $scope.loading = true;
                $scope.itemsLine = {
                    item: drug.item.id,
                    uuid: drug.uuid,
                    itemSoh: drug.counted,
                    itemBatch: drug.itemBatch,
                    pharmacyLocation: drug.pharmacyLocation.id,
                    itemVirtualstock: drug.itemVirtualstock,
                    itemExpiryDate: drug.itemExpiryDate
                }
                openmrsRest.update($scope.resource + "/itemsLine", $scope.itemsLine).then(function (response) {
                    $scope.getData();
                    scope.saveTransaction(drug);
                    console.log(response)
                    toastr.success('Data saved successfully.', 'Success');
                    $scope.loading = false;
                }, function (e) {
                    console.error(e);
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });

            }, function () {

            });
    }

    $scope.saveTransaction = function (drug) {
        $scope.transaction.adjustmentDate = new Date();
        $scope.transaction.status = "VALID";
        $scope.transaction.item = drug.item.id;
        openmrsRest.update($scope.resource + "/transaction", $scope.transaction).then(function (response) {
            console.log(response);
        }, function (e) {
            console.error(e);
            toastr.error('An unexpected error has occured.', 'Error');
        });
    }

}])

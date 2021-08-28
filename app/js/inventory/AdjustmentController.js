angular.module('AdjustmentController', []).controller('AdjustmentController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', '$location', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr, $location) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Adjustment";
    $scope.resource = "savicspharmacy";
    $scope.item_id = $stateParams.id;
    $scope.adjustmentuuid = $stateParams.adjustmentuuid;
    $scope.selectedBatch_itemBatch = $stateParams.itemBatch;
    $scope.adjustment = {};
    $scope.selectedBatch = {};
    $scope.transactionType = "padj";
    $scope.transactionTypes = [];

    if ($stateParams.batch_id) {
        $scope.batch_id = $stateParams.batch_id;
    }
    if ($stateParams.batch_counted_qty) {
        $scope.adjustment.quantity = $stateParams.batch_counted_qty;
    }
    if ($stateParams.batch_reason) {
        $scope.adjustment.reason = $stateParams.batch_reason;
    }

    var dictionary = require("../utils/dictionary");
    $scope.batches = [];
    $scope.transactionTypes = dictionary.getTransactionTypes("en");

    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "adjustment": "Adjustment" };

    var vm = this;
    vm.appTitle = "Adjustment";

    $scope.batches = [];

    openmrsRest.get($scope.resource + "/itemsLine?item=" + $scope.item_id).then(function (response) {
        if (response.results.length >= 1) {
            $scope.batches = response.results;
            $scope.item = response.results[0].item;

            //for edition
            if ($stateParams.itembatch && $stateParams.adjustmentuuid) {
                $scope.selectedBatch = $scope.batches.find(element => element.itemBatch == $stateParams.itembatch);

                openmrsRest.get($scope.resource + "/transaction/" + $scope.adjustmentuuid).then(function (response) {
                    if (response && response.uuid) {
                        $scope.adjustment = response;
                        $scope.adjustment.oldTransactionType = $scope.adjustment.transactionType;
                        $scope.adjustment.oldQuantity = $scope.adjustment.quantity;
                        if ($scope.adjustment.transactionType == 2) {
                            $scope.transactionType = "padj";
                        } else if ($scope.adjustment.transactionType == 1) {
                            $scope.transactionType = "nadj";
                        }
                    }
                })
            }

            // Add a new contact
            $scope.submit = function () {
                if ($scope.transactionTypes && $scope.transactionTypes.length > 0) {
                    if ($scope.transactionType == "nadj") {
                        $scope.adjustment.transactionType = 1;
                        $scope.adjustment.transactionTypeId = 1;
                        $scope.adjustment.transactionTypeCode = "nadj";
                    } else {
                        $scope.adjustment.transactionType = 2;
                        $scope.adjustment.transactionTypeId = 2;
                        $scope.adjustment.transactionTypeCode = "padj";
                    }

                    $scope.adjustment.adjustmentDate = new Date();
                    $scope.adjustment.itemBatch = $scope.selectedBatch.itemBatch;
                    $scope.adjustment.date = new Date();
                    $scope.adjustment.itemExpiryDate = $scope.selectedBatch.itemExpiryDate;
                    $scope.adjustment.status = "INIT";
                    $scope.adjustment.pharmacyLocation = $scope.selectedBatch.pharmacyLocation.id;
                    $scope.adjustment.item = $scope.selectedBatch.item.id;
                    $scope.adjustment.selectedBatchUuid = $scope.selectedBatch.uuid;

                    $scope.loading = true;
                    //Creation
                    openmrsRest.create($scope.resource + "/transaction", $scope.adjustment).then(function (response) {
                        $scope.adjustmentRes = response;
                        $state.go('home.inventory')
                        toastr.success('Data saved successfully.', 'Success');
                    }, function (e) {
                        console.error(e);
                        $scope.loading = false;
                        toastr.error('An unexpected error has occured.', 'Error');
                    });
                } else {
                    toastr.error('Transaction type are missing.', 'Error');
                }

            }
        }
    })

    $scope.returnToPrevious = function () {
        const params = getParameters('/adjustment/:item_id/:batch_id', $location.path());
        console.log(params);
        if (params.item_id && params.batch_id) { //for parameters with two ids
            $state.go('home.viewdetail', { id: params.item_id });
        } else {
            $state.go('home.inventory', {});
        }
    }

    const getParameters = (temp, path) => {
        const parameters = {};
        const tempParts = temp.split('/');
        const pathParts = path.split('/');
        for (let i = 0; i < tempParts.length; i++) {
            const element = tempParts[i];
            if (element.startsWith(':')) {
                const key = element.substring(1, element.length);
                parameters[key] = pathParts[i];
            }
        }
        return parameters;
    };

}]);

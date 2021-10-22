angular.module('AdjustmentController', []).controller('AdjustmentController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', '$location', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr, $location, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = $translate.instant("Adjustment");
    $scope.resource = "savicspharmacy";
    $scope.item_id = $stateParams.id ? $stateParams.id : $stateParams.item_id;
    $scope.adjustmentuuid = $stateParams.adjustmentuuid;
    $scope.adjustment = {};
    $scope.selectedBatch = {};
    $scope.selectedItemList = null;
    $scope.transactionType = "padj";
    $scope.transactionTypes = [];
    $scope.stocktake = false;

    if ($stateParams.batch_id) {
        $scope.batch_id = $stateParams.batch_id;
    }
    if ($stateParams.adjustment_for) {
        $scope.appTitle = $stateParams.adjustment_for;
        $scope.stocktake = true;
    }

    var dictionary = require("../utils/dictionary");
    $scope.batches = [];
    $scope.transactionTypes = dictionary.getTransactionTypes("en");
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "adjustment": "Adjustment" };

    var vm = this;
    vm.appTitle = $stateParams.adjustment_for ? $stateParams.adjustment_for : $translate.instant("Adjustment");

    $scope.batches = [];

    openmrsRest.get($scope.resource + "/itemsLine?item=" + $scope.item_id).then(function (response) {
        if (response.results.length >= 1) {
            $scope.batches = response.results;
            $scope.item = response.results[0].item;
            if ($stateParams.batch_id) {
                $scope.selectedItemList = $scope.batches.find(element => element.id == $stateParams.batch_id);
            }
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
                            $scope.adjustment.oldTransactionTypeCode = "padj";
                        } else if ($scope.adjustment.transactionType == 1) {
                            $scope.transactionType = "nadj";
                            $scope.adjustment.oldTransactionTypeCode = "nadj";
                        }
                    }
                })
            }

            // Add a new contact
            $scope.submit = function () {
                if ($scope.transactionTypes && $scope.transactionTypes.length > 0) {
                    if ($scope.stocktake && $scope.adjustment.quantity) {
                        if ($scope.adjustment.quantity > $scope.selectedItemList.itemSoh) {//if the counted quantity is greater than the physical quantity then we will do the positive adjusment
                            $scope.adjustment.transactionType = 8;
                            $scope.adjustment.transactionTypeId = 8;
                            $scope.adjustment.transactionTypeCode = "padj";
                        } else {
                            $scope.adjustment.transactionType = 7;
                            $scope.adjustment.transactionTypeId = 7;
                            $scope.adjustment.transactionTypeCode = "nadj";

                        }
                        $scope.adjustment.quantity = Math.abs($scope.adjustment.stocktakedifference);
                    } else {
                        if ($scope.transactionType == "nadj") {
                            $scope.adjustment.transactionType = 1;
                            $scope.adjustment.transactionTypeId = 1;
                            $scope.adjustment.transactionTypeCode = "nadj";
                        } else {
                            $scope.adjustment.transactionType = 2;
                            $scope.adjustment.transactionTypeId = 2;
                            $scope.adjustment.transactionTypeCode = "padj";
                        }
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
                        toastr.success($translate.instant('Data saved successfully.'), 'Success');
                    }, function (e) {
                        console.error(e);
                        $scope.loading = false;
                        toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
                    });
                } else {
                    toastr.error($translate.instant('Transaction type are missing.'), 'Error');
                }

            }

            $scope.getSpecificItemList = function (batch_id) {
                $scope.selectedItemList = $scope.batches.find(element => element.id == batch_id);
            }
        }
    })


    var watch = {};
    watch.countedQuantity = $scope.$watch('adjustment.quantity', function (newval, oldval) {
        if (newval && Number.isInteger(newval) && $scope.selectedItemList) {
            $scope.adjustment.stocktakedifference = $scope.adjustment.quantity - $scope.selectedItemList.itemSoh;
        } else {
            $scope.adjustment.stocktakedifference = 0;
        }
    });
    $scope.$on('$destroy', function () {// in case of destroy, we destroy the watch
        watch.countedQuantity();
    });


    $scope.returnToPrevious = function () {
        const params = getParameters('/adjustment/:item_id/:batch_id', $location.path());
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

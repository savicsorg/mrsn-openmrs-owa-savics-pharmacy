angular.module('AdjustmentController', []).controller('AdjustmentController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
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

    var dictionary = require("../utils/dictionary");
    $scope.batches = [];
    $scope.transactionTypes = dictionary.getTransactionTypes("en");

    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "adjustment": "Adjustment" };

    var vm = this;
    vm.appTitle = "Adjustment";

    var type = "";
    var msg = "";
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
                        $scope.adjustment.oldTransactionType = $scope.adjustment.transactionType.code;
                        $scope.adjustment.oldQuantity = $scope.adjustment.quantity;
                        $scope.transactionType = $scope.adjustment.transactionType.code;
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
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.drugs')
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

angular.module('AdjustmentController', []).controller('AdjustmentController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Adjustment";
        $scope.resource = "savicspharmacy";
        $scope.item_id = $stateParams.id;
        $scope.adjustment = {};
        $scope.selectedBatch = {};
        $scope.transactionType = "padj";
        $scope.transactionTypes = [];

        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "adjustment": "Adjustment"};

        var vm = this;
        vm.appTitle = "Adjustment";

        var type = "";
        var msg = "";


        $scope.getItemsLines = function () {
            $scope.batches = [];
            openmrsRest.get($scope.resource + "/itemsLine?item=" + $scope.item_id).then(function (response) {
                if (response.results.length >= 1) {
                    $scope.batches = response.results;
                    $scope.item = response.results[0].item;
                    console.log($scope.batches)
                }
            })
        }
        $scope.getItemsLines();

        $scope.getAdjutementTransactionTypes = function () {
            $scope.batches = [];
            openmrsRest.get($scope.resource + "/transactionType?name=adjustment").then(function (response) {
                if (response.results.length >= 1) {
                    $scope.transactionTypes = response.results;
                    console.log($scope.transactionTypes)
                }
            })
        }
        $scope.getAdjutementTransactionTypes();

        // Add a new contact
        $scope.submit = function () {
            console.log("aaaaaaaa")
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

                $scope.adjustment.itemBatch = $scope.selectedBatch.itemBatch;
                $scope.adjustment.date = new Date();
                $scope.adjustment.itemExpiryDate = $scope.selectedBatch.itemExpiryDate;
                //$scope.adjustment.amount = ??;
                $scope.adjustment.status = "INIT";
                $scope.adjustment.pharmacyLocation = $scope.selectedBatch.pharmacyLocation.id;
                $scope.adjustment.item = $scope.selectedBatch.item.id;
                $scope.adjustment.selectedBatchUuid = $scope.selectedBatch.uuid;

                console.log($scope.adjustment);
                $scope.loading = true;
                //Creation
                console.log("Creating new adjustment");
                openmrsRest.create($scope.resource + "/transaction", $scope.adjustment).then(function (response) {
                    console.log(response);
                    $scope.adjustmentRes = response;
                    $state.go('home.inventory')
                    toastr.success('Data saved successfully.', 'Success');
                }, function (e) {
                    console.error(e);
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            }else{
                toastr.error('Transaction type are missing.', 'Error');
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
angular.module('TransactionViewController', []).controller('TransactionViewController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', '$mdDialog', 'openmrsRest', 'toastr', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, $mdDialog, openmrsRest, toastr, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = $translate.instant("Transaction details");
    $scope.resource = "savicspharmacy";
    $scope.concept_ressource = "concept";
    $scope.transactionuuid = $stateParams.uuid;
    $scope.itemuuid = $stateParams.itemuuid;
    $scope.itemid = $stateParams.item_id;
    $scope.itembatch = $stateParams.item_Batch;
    console.log([$scope.itemid, $scope.itemuuid, $scope.transactionuuid, $scope.itembatch]);
    var dictionary = require("../utils/dictionary");
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Stock and inventory": "inventory", "History": "viewhistory", "Details": "Transactionview" };

    var vm = this;
    vm.appTitle = $translate.instant("View transaction details");

    $scope.approveBtn = {
        text: "",
        status: "Initiated",
        approved: false,
        background: ""
    };

    $scope.cancelBtn = {
        text: "Cancel",
        status: "Initiated",
        canceled: false,
        background: "#ccc"
    };

    $scope.getTransactionType = function (id) {
        return dictionary.getTransactionTypeById(id, $rootScope.selectedLanguage);
    };

    openmrsRest.get($scope.resource + "/transaction/" + $scope.transactionuuid).then(function (response) {
        if (response && response.uuid) {
            $scope.transaction = response;
            $scope.itemuuid = response.item.uuid;
            $scope.itemid = response.item.id;
            $scope.itembatch = response.itemBatch;
            if ($scope.transaction.status == "VALID") {
                $scope.approveBtn.status = "Approved";
                $scope.approveBtn.background = "#28c900";
            } else if ($scope.transaction.status == "REJEC") {
                $scope.approveBtn.status = "Rejected"
                $scope.approveBtn.background = "#F99";
            } else {
                $scope.approveBtn.background = "";
                $scope.approveBtn.status = "Initiated";
            }

            $scope.openEditTransaction = function () {
                $state.go('home.editAdjustment', {
                    id: $scope.itemid,
                    adjustmentuuid: $scope.transactionuuid,
                    itembatch: $scope.itembatch
                });
            };
        }
    })


    $scope.openHistory = function () {
        $state.go('home.viewhistorybatch', {
            item_id: $scope.itemid,
            uuid: $scope.itemuuid,
            item_Batch: $scope.itembatch
        });
    };


    $scope.reject = function () {
        $mdDialog.show($mdDialog.confirm()
            .title('Confirmation')
            .textContent($translate.instant('Do you really want to reject this adjustment ?'))
            .ok($translate.instant('Yes'))
            .cancel($translate.instant('Cancel'))).then(function () {
                $scope.loading = true;
                $scope.transaction.adjustmentDate = new Date();
                $scope.transaction.status = "REJEC";
                $scope.transaction.pharmacyLocation = $scope.transaction.pharmacyLocation.id;
                var itemuuid = $scope.transaction.item.uuid;
                $scope.transaction.item = $scope.transaction.item.id;
                openmrsRest.update($scope.resource + "/transaction", $scope.transaction).then(function (response) {
                    $scope.adjustmentRes = response;
                    toastr.success($translate.instant('Operation done successfully.'), 'Success');
                    $scope.loading = false;
                    $scope.approveBtn.status = $translate.instant("Rejected")
                    $scope.approveBtn.background = "#F99";
                }, function (e) {
                    console.error(e);
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
                });

            }, function () {

            });
    }


    $scope.approve = function () {
        $mdDialog.show($mdDialog.confirm()
            .title('Confirmation')
            .textContent($translate.instant('Do you really want to approve this adjustment ?'))
            .ok($translate.instant('Yes'))
            .cancel($translate.instant('Cancel'))).then(function () {
                $scope.loading = true;
                $scope.transaction.adjustmentDate = new Date();
                $scope.transaction.status = "VALID";
                $scope.transaction.pharmacyLocation = $scope.transaction.pharmacyLocation.id;
                var itemuuid = $scope.transaction.item.uuid;
                $scope.transaction.item = $scope.transaction.item.id;
                openmrsRest.update($scope.resource + "/transaction", $scope.transaction).then(function (response) {
                    $scope.adjustmentRes = response;
                    toastr.success($translate.instant('Data saved successfully.'), 'Success');
                    $scope.approveBtn.status = $translate.instant("Approved");
                    $scope.approveBtn.background = "#28c900";
                    $scope.loading = false;
                }, function (e) {
                    console.error(e);
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
                });

            }, function () {

            });
    }
}]);
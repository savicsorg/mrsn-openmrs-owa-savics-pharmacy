angular.module('TransactionViewController', []).controller('TransactionViewController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', '$mdDialog', 'openmrsRest', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, $mdDialog, openmrsRest, toastr) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Transaction details";
        $scope.resource = "savicspharmacy";
        $scope.concept_ressource = "concept";
        $scope.transactionuuid = $stateParams.uuid;
        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "Stock and inventory": "inventory", "History": "viewhistory", "Details": "Transactionview"};

        var vm = this;
        vm.appTitle = "View transaction details";

        $scope.approveBtn = {
            text: "Approve",
            status: "Initiated",
            approved: false,
            background: "#28c900"
        };

        openmrsRest.get($scope.resource + "/transaction/" + $scope.transactionuuid).then(function (response) {
            if (response && response.uuid) {
                $scope.transaction = response;
                $scope.itemuuid = response.item.uuid;
                if ($scope.transaction.status == "VALID") {
                    $scope.approveBtn.text = "Approved on " + new Date($scope.transaction.adjustmentDate).toLocaleDateString();
                    $scope.approveBtn.status = "Approved" ;
                    $scope.approveBtn.background = "#28c900";
                } else if ($scope.transaction.status == "REJEC") {
                    $scope.approveBtn.text = "Rejected on " + new Date($scope.transaction.adjustmentDate).toLocaleDateString();
                    $scope.approveBtn.status = "Rejected"
                    $scope.approveBtn.background = "#F99";
                } else {
                    $scope.approveBtn.background = "";
                    $scope.approveBtn.status = "Initiated";
                }
            }
        })


        $scope.approve = function () {
            $mdDialog.show($mdDialog.confirm()
                    .title('Confirmation')
                    .textContent('Do you really want to approve this order ?')
                    .ok('Yes')
                    .cancel('Cancel')).then(function () {
                $scope.loading = true;
        console.log($scope.transaction);
                $scope.transaction.adjustmentDate = new Date();
                $scope.transaction.status = "VALID";
                $scope.transaction.transactionType = $scope.transaction.transactionType.id;
                $scope.transaction.transactionTypeId = $scope.transaction.transactionType.id;
                $scope.transaction.pharmacyLocation = $scope.transaction.pharmacyLocation.id;
                var itemuuid = $scope.transaction.item.uuid;
                $scope.transaction.item = $scope.transaction.item.id;
                openmrsRest.update($scope.resource + "/transaction", $scope.transaction).then(function (response) {
                    console.log($scope.transaction.item.uuid)
                    $scope.adjustmentRes = response;
                    $state.go('home.viewhistory', {
                        uuid: itemuuid
                    });
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
    }]);
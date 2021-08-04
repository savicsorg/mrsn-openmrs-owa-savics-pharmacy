angular.module('TransactionViewController', []).controller('TransactionViewController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', '$mdDialog', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, $mdDialog, openmrsRest) {
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
            approved: false
        };

        openmrsRest.get($scope.resource + "/transaction/" + $scope.transactionuuid).then(function (response) {
            console.log(response);
            if (response && response.uuid) {
                $scope.transaction = response;
                $scope.itemuuid = response.item.uuid;
                console.log($scope.transaction);
            }
        })


        $scope.approve = function () {
            $mdDialog.show($mdDialog.confirm()
                    .title('Confirmation')
                    .textContent('Do you really want to approve this order ?')
                    .ok('Yes')
                    .cancel('Cancel')).then(function () {
                $scope.order.dateApprobation = new Date();
                $scope.saveOrder();
            }, function () {

            });

        }



    }]);
angular.module('viewHistoryController', []).controller('viewHistoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "View history";
        $scope.resource = "savicspharmacy";
        $scope.item_uuid = $stateParams.uuid;
        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "Viewhistory": "View history"};

        var vm = this;
        vm.appTitle = "View history";

        var type = "";
        var msg = "";

        $scope.histories = [
            {"item": "aspirine", "bath": "89809809", "type": "negative", "qty": "100", "date": "2014-12-31"},
            {"item": "aspirine", "bath": "89809809", "type": "positive", "qty": "100", "date": "2014-12-31"}
        ]

        $scope.transactions = [];
        console.log("response==== 1")
        openmrsRest.get($scope.resource + "/item/" + $scope.item_uuid).then(function (response) {
            console.log(response);
            if (response && response.uuid) {
                $scope.item = response;
                console.log($scope.item);

                console.log("response==== 2")
                openmrsRest.get($scope.resource + "/transaction?item=" + $scope.item.id).then(function (response) {
                    console.log(response)
                    if (response.results.length >= 1) {
                        $scope.transactions = response.results;
                        console.log($scope.transactions)
                    }
                })
            }
        })

        $scope.openViewTransaction = function (data) {
            $state.go('home.viewtransaction', {
                uuid: data.uuid
            });
        };

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
angular.module('AdjustmentController', []).controller('AdjustmentController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Adjustment";
        $scope.resource = "savicspharmacy";
        $scope.item_id = $stateParams.id;
        $scope.adjustment = {};

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

        // Add a new contact
        $scope.submit = function () {
            console.log("aaaaaaaa")
            console.log($scope.adjustment)
            $scope.loading = true;
            
            $scope.order.supplier = $scope.order.supplier.id;
            //Creation
            console.log("Creating new adjustment");
            openmrsRest.create($scope.resource + "/transaction", $scope.adjustment).then(function (response) {
                console.log(response);
                $scope.adjustmentRes = response;
                loadData();
                toastr.success('Data saved successfully.', 'Success');
            }, function (e) {
                console.error(e);
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
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
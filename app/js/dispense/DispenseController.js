angular.module('DispenseController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('DispenseController', ['$scope', '$rootScope', 'openmrsRest', 'toastr', '$state', '$stateParams', '$mdDialog', function ($scope, $rootScope, openmrsRest, toastr, $state, $stateParams, $mdDialog) {
        $scope.resource = "savicspharmacy";
        $rootScope.links = {"Pharmacy management module": "", "Dispense": "dispense"};
        $scope.sending = {customer: {}, person: {}, sendingAmount: 0};
        $scope.dispenseMode = 1;
        $scope.lines = [];
        $scope.loading = false;
        $scope.loadingStack = 0;
        $scope.batchSearchText = "";
        $scope.itemSearchText = "";
        $scope.patientSearchText = "";
        $scope.customerSearchText = "";
        $scope.options = {
            autoSelect: true,
            boundaryLinks: false,
            largeEditDialog: true,
            pageSelector: true,
            rowSelection: true
        };

        var popLoading = function () {
            $scope.loadingStack--;
            if ($scope.loadingStack == 0)
                $scope.loading = false;
        }

        var pushLoading = function () {
            $scope.loadingStack++;
            $scope.loading = true;
        }

        $scope.query = {
            limit: 5,
            page: 1
        };

        $scope.logPagination = function (page, limit) { };

        var _ = require("underscore");

        $scope.searchCustomers = function (searchText) {
            return openmrsRest.getFull($scope.resource + "/customer?name=" + searchText).then(function (response) {
                return response.results;
            }, function (e) {
                return [];
            });
        };

        $scope.updateLineValue = function (index) {
            $scope.lines[index].sendingDetailsValue = $scope.lines[index].item.sellPrice * $scope.lines[index].sendingDetailsQuantity;
            $scope.updateAmount();
        };

        $scope.updateAmount = function () {
            $scope.sending.sendingAmount = _.reduce($scope.lines, function (result, line) {
                return result + line.sendingDetailsValue;
            }, 0);
        };

        $scope.searchPatients = function (searchText) {
            return openmrsRest.getFull("patient?q=" + searchText).then(function (response) {
                return response.results;
            }, function (e) {
                return [];
            });
        };

        $scope.searchItems = function (searchText) {
            return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
                return response.results;
            }, function (e) {
                return [];
            });
        };

        $scope.searchItemsLines = function (item, index) {
            if (item && item.uuid)
                return openmrsRest.get($scope.resource + "/itemsLine?item=" + item.id).then(function (response) {
                    $scope.lines[index].itemsLines = response.results;
                }, function (e) {
                    return [];
                });
            else
                return [];
        };

        $scope.searchItemLines = function (searchText, item) {
            if (item && item.uuid)
                return openmrsRest.get($scope.resource + "/itemsLine?item=" + item.id + "&itemBatch=" + searchText).then(function (response) {
                    return response.results;
                }, function (e) {
                    return [];
                });
            else
                return [];
        };

        $scope.selectedCustomerChange = function (item) {
            $scope.sending.customer = item;
            $scope.sending.person = null;
        };

        $scope.selectedPatientChange = function (item) {
            $scope.sending.person = item;
             $scope.sending.customer = null;
        };

        $scope.selectedItemChange = function (item, index) {
            if (item){
                $scope.lines[index].item = item;
                $scope.lines[index].itemId = item.id;
                $scope.updateAmount();
                $scope.lines[index].itemsLines = $scope.searchItemsLines(item, index);
            }else{
                $scope.lines[index].item = null;
                $scope.lines[index].itemId = null;
                $scope.updateAmount();
                $scope.lines[index].itemsLines = []
            }
        };
        

        $scope.dispenseModeChange = function () {
            console.log($scope.dispenseMode)
            $scope.sending.person = null;
            $scope.sending.customer = null;
            $scope.selectedCustomer = null;
            $scope.selectedPatient = null;
            $scope.customerSearchText = null;
        };

        $scope.selectedItemLineChange = function (batch, index) {
            batch = JSON.parse(batch);
            $scope.lines[index].sendingItemBatch = batch;
            $scope.lines[index].sendingDetailsValue = $scope.lines[index].item.sellPrice * $scope.lines[index].sendingDetailsQuantity;
        };

        $scope.getData = function () {
            $scope.loading = true;
            if ($stateParams.uuid && $stateParams.uuid != "new"){
                openmrsRest.getFull($scope.resource + "/sending/" + $stateParams.uuid).then(function (response) {
                    $scope.sending = response;
                    $scope.sending.date = new Date($scope.sending.date);
                    $scope.dispenseMode = ($scope.sending.customer != null)?2:1;
                    $scope.selectedCustomer = $scope.sending.customer;
                    $scope.selectedPatient = $scope.sending.person;
                    $scope.customerSearchText = ($scope.sending.customer != null)?$scope.sending.customer.name : $scope.sending.person.display;
                    openmrsRest.getFull($scope.resource + "/sendingDetail?sendingId=" + $scope.sending.id).then(function (response) {
                        $scope.lines = response.results;
                        for (var i = 0; i < $scope.lines.length; i++) {
                            $scope.selectedItemChange($scope.lines[i].item, i);
                            $scope.lines[i].itemId = $scope.lines[i].item.id;
                        }
                        $scope.loading = false;
                    }, function (e) {
                        $scope.loading = false;
                        toastr.error('An unexpected error has occured.', 'Error');
                    });
                }, function (e) {
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            }else{
                $scope.loading = false;
            }
        }

        $scope.getData();

        $scope.addSendingLine = function () {
            $scope.lines.push({
                sending: $scope.sending.id,
                sendingDetailsQuantity: 0,
                item: {name: ""},
                itemsLines: [],
                sendingDetailsValue: 0,
                sendingItemBatch: "",
            });
        }

        $scope.saveSending = function () {
            $scope.loading = true;
            var query = JSON.parse(JSON.stringify($scope.sending));
            query.customer = ($scope.sending.customer) ? $scope.sending.customer.id : null;
            query.person = ($scope.sending.person) ? $scope.sending.person.uuid : null;
            query.date = new Date($scope.sending.date);
            query.sendingDetails = [];

            if ($scope.lines && $scope.lines.length > 0) {
                for (var l in $scope.lines) {
                    var myLine = {
                        "item": $scope.lines[l].itemId,
                        "sending": $scope.lines[l].sending,
                        "sendingDetailsQuantity": $scope.lines[l].sendingDetailsQuantity,
                        "sendingDetailsValue": $scope.lines[l].sendingDetailsValue,
                        "sendingItemBatch": $scope.lines[l].sendingItemBatch,
                    }
                    query.sendingDetails.push(myLine);
                }
            }
            
            if ($scope.sending && $scope.sending.uuid) {    //Edit
                openmrsRest.update($scope.resource + "/sending", query).then(function (response) {
                    response.date = new Date(response.date);
                    $scope.sending = response;
                    $scope.getData();
                    toastr.success('Data saved successfully.', 'Success');
                    $state.go('home.dispensemain');
                    $scope.loading = false;
                }, function (e) {
                    console.log(e)
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            } else {    //Creation
                openmrsRest.create($scope.resource + "/sending", query).then(function (response) {
                    response.date = new Date(response.date);
                    $scope.sending = response;
                    $scope.getData();
                    toastr.success('Data saved successfully.', 'Success');
                    $state.go('home.dispensemain');
                    $scope.loading = false;
                }, function (e) {
                    console.log(e)
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            }
        }

        $scope.deleteSending = function (sending) {
            var confirm = $mdDialog.confirm()
                    .title('Confirmation')
                    .textContent('Do you really want to delete this dispense ?')
                    .ok('Yes')
                    .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $scope.loading = true;
                openmrsRest.remove($scope.resource + "/sending", sending, "Generic Reason").then(function (response) {
                    loadData();
                    toastr.success('Data removed successfully.', 'Success');
                }, function (e) {
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            }, function () {

            });
        }

        $scope.deleteSendingDetail = function (sendingDetail, index) {
            var confirm = $mdDialog.confirm()
                    .title('Confirmation')
                    .textContent('Do you really want to delete this line ?')
                    .ok('Yes')
                    .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                if (sendingDetail.uuid) {
                    $scope.loading = true;
                    openmrsRest.remove($scope.resource + "/sendingDetail", sendingDetail, "Generic Reason").then(function (response) {
                        $scope.lines.splice(index, 1);
                        $scope.updateAmount();
                        $scope.loading = false;
                        toastr.success('Data removed successfully.', 'Success');
                    }, function (e) {
                        $scope.loading = false;
                        toastr.error('An unexpected error has occured.', 'Error');
                    });
                } else {
                    $scope.lines.splice(index, 1);
                    $scope.updateAmount();
                }
            }, function () {

            });
        }

        $scope.viewSending = function (data) {
            $state.go('home.despense', {
                uuid: data.uuid
            });
        }

    }]);
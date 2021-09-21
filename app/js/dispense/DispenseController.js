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

        $scope.searchItemLines = function (searchText, item) {
            console.log(searchText, item)
            if (item && item.uuid)
                return openmrsRest.get($scope.resource + "/itemsLine?item=" + item.id + "&itemBatch=" + searchText).then(function (response) {
                    console.log(response)
                    return response.results;
                }, function (e) {
                    return [];
                });
            else
                return [];
        };

        $scope.selectedCustomerChange = function (item) {
            $scope.sending.customer = item;
        };

        $scope.selectedPatientChange = function (item) {
            $scope.sending.person = item;
        };

        $scope.selectedItemChange = function (item, index) {
            $scope.lines[index].item = item;
            $scope.lines[index].itemId = item.id;
            $scope.updateAmount();
        };

        $scope.selectedItemLineChange = function (batch, index) {
            $scope.lines[index].sendingItemBatch = batch.itemBatch;
            $scope.lines[index].sendingItemExpiryDate = new Date(batch.itemExpiryDate);
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
                            $scope.lines[i].sendingItemExpiryDate = new Date($scope.lines[i].sendingItemExpiryDate);
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
                sendingDetailsValue: 0,
                sendingItemBatch: "",
                sendingItemExpiryDate: null
            });
        }

        $scope.saveSending = function () {
            $scope.loading = true;
            var query = JSON.parse(JSON.stringify($scope.sending));
            query.customer = $scope.sending.customer.id;
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
                        "sendingItemExpiryDate": $scope.lines[l].sendingItemExpiryDate,
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

        $scope.saveSendingDetail = function (line, index) {
            pushLoading();
            var query = JSON.parse(JSON.stringify(line));
            query.item = line.item.id;
            if (line && line.uuid) {    //Edit
                query.sending = line.sending.id;
                openmrsRest.update($scope.resource + "/sendingDetail", query).then(function (response) {
                    response.sendingItemExpiryDate = new Date(response.sendingItemExpiryDate);
                    $scope.lines[index] = response;
                    popLoading();
                    toastr.success('Data saved successfully.', 'Success');
                }, function (e) {
                    popLoading();
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            } else {    //Creation
                openmrsRest.create($scope.resource + "/sendingDetail", query).then(function (response) {
                    response.sendingItemExpiryDate = new Date(response.sendingItemExpiryDate);
                    $scope.lines[index] = response;
                    //$scope.lines[index].location = $scope.lines[i].item.pharmacyLocation.uuid;
                    popLoading();
                    toastr.success('Data saved successfully.', 'Success');
                }, function (e) {
                    popLoading();
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
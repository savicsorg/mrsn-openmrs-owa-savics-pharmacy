angular.module('DispenseController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('DispenseController', ['$scope', '$rootScope', 'openmrsRest', 'toastr', '$state', '$stateParams', '$mdDialog', '$translate', function ($scope, $rootScope, openmrsRest, toastr, $state, $stateParams, $mdDialog, $translate) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = {"Pharmacy management module": "", "Dispense": "dispense"};
    $scope.sending = {customer: {}, person: {}, sendingAmount: 0};
    $scope.dispenseModeuuid = "b54a1ddd-d25b-492e-98e9-5f1de0520e1a";
    $scope.dispenseMode = undefined;
    $scope.dispenseModes = [];
    $scope.lines = [];
    $scope.loading = false;
    $scope.isEditable = true;
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
    $scope.validateBtn = {
        text: $translate.instant("Validate"),
        enabled: false,
        visible: false
    };
   
    $scope.cancelBtn = {
        text: $translate.instant("Cancel"),
        status: $translate.instant("Initiated"),
        canceled: false,
        visible: false,
        enabled: false,
        background: "#ccc"
    };

    $scope.query = {
        limit: 5,
        page: 1
    };

    $scope.logPagination = function (page, limit) { };

    var _ = require("underscore");

    $scope.searchCustomers = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/customer?name=" + searchText).then(function (response) {
            return response.results.filter(function(item) { return item.customerType.id == $scope.dispenseMode; });
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

    $scope.getCustomerTypes = function () {
        return openmrsRest.getFull($scope.resource + "/customerType").then(function (response) {
            $scope.dispenseModes = response.results;
            
        }, function (e) {
            $scope.dispenseModes = [];
        });
    };
    
    $scope.getCustomerTypes();

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
        if (item) {
            $scope.lines[index].item = item;
            $scope.lines[index].itemId = item.id;
            $scope.updateAmount();
            $scope.lines[index].itemsLines = $scope.searchItemsLines(item, index);
        } else {
            $scope.lines[index].item = null;
            $scope.lines[index].itemId = null;
            $scope.updateAmount();
            $scope.lines[index].itemsLines = []
        }
    };


    $scope.dispenseModeChange = function (dispenseMode) {
        $scope.sending.person = undefined;
        $scope.sending.customer = undefined;
        $scope.selectedCustomer = undefined;
        $scope.selectedPatient = undefined;
        $scope.customerSearchText = undefined;
        var customerType = $scope.dispenseModes.filter(function(item) { return item.id == dispenseMode; })[0];
        $scope.dispenseMode = customerType.id;
        $scope.dispenseModeuuid = customerType.uuid;
    };

    $scope.selectedItemLineChange = function (batch, index) {
        $scope.lines[index].sendingItemBatch = batch;
        $scope.lines[index].sendingDetailsValue = $scope.lines[index].item.sellPrice * $scope.lines[index].sendingDetailsQuantity;
    };

    $scope.getData = function () {
        $scope.loading = true;
        if ($stateParams.uuid && $stateParams.uuid != "new") {
            openmrsRest.getFull($scope.resource + "/sending/" + $stateParams.uuid).then(function (response) {
                $scope.sending = response;
                $scope.sending.date = new Date($scope.sending.date);
                $scope.dispenseMode = $scope.sending.customerType.id ;
                $scope.dispenseModeuuid = $scope.sending.customerType.uuid ;
                $scope.selectedCustomer = $scope.sending.customer;
                $scope.selectedPatient = $scope.sending.person;

                if($scope.sending && $scope.sending.validationDate){
                    $scope.isEditable = false;
                    $scope.validateBtn.text = $translate.instant("Validated on ") + new Date($scope.sending.validationDate).toLocaleDateString();
                    $scope.validateBtn.enabled = false;
                    $scope.validateBtn.visible = true;
                } else {
                    $scope.isEditable = true;
                    $scope.validateBtn.text = $translate.instant("Validate");
                    $scope.validateBtn.enabled = true;
                    $scope.validateBtn.visible = true;
                }

                $scope.customerSearchText = ($scope.sending.customer != null) ? $scope.sending.customer.name : $scope.sending.person.display;
                openmrsRest.getFull($scope.resource + "/sendingDetail?sendingId=" + $scope.sending.id).then(function (response) {
                    $scope.lines = response.results;
                    for (var i = 0; i < $scope.lines.length; i++) {
                        $scope.selectedItemChange($scope.lines[i].item, i);
                        $scope.lines[i].itemId = $scope.lines[i].item.id;
                    }
                    $scope.loading = false;
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
                });
            }, function (e) {
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
            });
        } else {
            $scope.isEditable = true;
            if($scope.sending && $scope.sending.validationDate){
                $scope.isEditable = false;
                $scope.validateBtn.text = $translate.instant("Validated on ") + new Date($scope.sending.validationDate).toLocaleDateString();
                $scope.validateBtn.enabled = false;
                $scope.validateBtn.visible = true;
            } else if($scope.sending && $scope.sending.id > 0){
                $scope.validateBtn.text = $translate.instant("Validate");
                $scope.validateBtn.enabled = true;
                $scope.validateBtn.visible = true;
            }
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
        query.person = ($scope.sending.person) ? $scope.sending.person.uuid :  null;
        query.date = new Date($scope.sending.date);
        query.sendingDetails = [];
        query.customerType = $scope.dispenseMode;

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
                toastr.success($translate.instant('Data saved successfully.'), 'Success');
                $state.go('home.dispensemain');
                $scope.loading = false;
            }, function (e) {
                console.log(e)
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/sending", query).then(function (response) {
                response.date = new Date(response.date);
                $scope.sending = response;
                $scope.getData();
                toastr.success($translate.instant('Data saved successfully.'), 'Success');
                $state.go('home.dispensemain');
                $scope.loading = false;
            }, function (e) {
                console.log(e)
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
            });
        }
    }

    $scope.deleteSending = function (sending) {
        var confirm = $mdDialog.confirm()
                .title('Confirmation')
                .textContent($translate.instant('Do you really want to delete this dispense ?'))
                .ok('Yes')
                .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.loading = true;
            openmrsRest.remove($scope.resource + "/sending", sending, "Generic Reason").then(function (response) {
                loadData();
                toastr.success($translate.instant('Data removed successfully.'), 'Success');
            }, function (e) {
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
            });
        }, function () {

        });
    }

    $scope.deleteSendingDetail = function (sendingDetail, index) {
        var confirm = $mdDialog.confirm()
                .title('Confirmation')
                .textContent($translate.instant('Do you really want to delete this line ?'))
                .ok('Yes')
                .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            if (sendingDetail.uuid) {
                $scope.loading = true;
                openmrsRest.remove($scope.resource + "/sendingDetail", sendingDetail, "Generic Reason").then(function (response) {
                    $scope.lines.splice(index, 1);
                    $scope.updateAmount();
                    $scope.loading = false;
                    toastr.success($translate.instant('Data removed successfully.'), 'Success');
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
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

    $scope.validate = function(){
        var confirm = $mdDialog.confirm()
            .title($translate.instant('Confirmation'))
            .textContent($translate.instant('Do you really want to validate this dispense ?'))
            .ok($translate.instant('Yes'))
            .cancel($translate.instant('Cancel'));
        $mdDialog.show(confirm).then(function () {
            $scope.sending.validationDate = new Date();
            $scope.sending.status = "VALID";
            $scope.saveSending();
        }, function (e) {
            console.error(e);
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
        });      
    }
    
    $scope.reject = function(){
        var confirm = $mdDialog.confirm()
            .title($translate.instant('Confirmation'))
            .textContent($translate.instant('Do you really want to cancel this dispense ?'))
            .ok($translate.instant('Yes'))
            .cancel($translate.instant('Cancel'));
        $mdDialog.show(confirm).then(function () {
            $scope.sending.validationDate = new Date();
            $scope.sending.status = "CANCEL";
            $scope.saveSending();
        }, function (e) {
            console.error(e);
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), 'Error');
        });      
    }
}]);

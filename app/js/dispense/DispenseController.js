angular.module('DispenseController', ['ngMaterial','ngAnimate', 'toastr']).controller('DispenseController', ['$scope', '$rootScope', 'openmrsRest', 'toastr', '$state', '$stateParams', function ($scope, $rootScope, openmrsRest, toastr, $state, $stateParams) {
    $scope.resource = "savicspharmcy";
    $rootScope.links = { "Pharmacy management module": "", "Dispense": "dispense" };
    $scope.sending = { customer: {}, person: {}, sendingAmount: 0 };
    $scope.dispenseMode = 1;
    $scope.lines = [];
    $scope.loading = false;
    $scope.searchText = "";
    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: true,
        pageSelector: true,
        rowSelection: true
    };

    $scope.query = {
        limit: 5,
        page: 1
    };

    $scope.logPagination = function (page, limit) { };

    var _ = require("underscore");

    $scope.searchCustomers = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/cutomer?name=" + searchText).then(function (response) {
            return response.results;
        }, function(e){
            return [];
        });
    };

    $scope.searchPatients = function (searchText) {
        return openmrsRest.getFull("patient?q=" + searchText).then(function (response) {
            return response.results;
        }, function(e){
            return [];
        });
    };

    $scope.searchItems = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
            return response.results;
        }, function(e){
            return [];
        });
    };

    $scope.searchItemLines = function (searchText, index) {
        if($scope.lines[index].item)
            return openmrsRest.getFull($scope.resource + "/itemLine?itemId=" + $scope.lines[index].item.id + "&batchNumber=" + searchText).then(function (response) {
                return response.results;
            }, function(e){
                return [];
            });
        else return [];           
    };

    $scope.selectedCustomerChange = function (item) {
        $scope.sending.customer = item;
    };

    $scope.selectedPatientChange = function (item) {
        $scope.sending.person = item;
    };

    $scope.selectedItemChange = function (item, index) {
        $scope.lines[index].item = item;
    };

    $scope.selectedItemLineChange = function (item, index) {
        $scope.lines[index].sendingItemBatch = item.itemBatch;
        $scope.lines[index].sendingItemExpiryDate = item.itemExpiryDate;
        $scope.lines[index].sendingDetailsValue = $scope.lines[index].item * $scope.lines[index].sendingDetailsQuantity;
    };

    $scope.getData = function () {
        $scope.loading = true;
        if($stateParams.uuid && $stateParams.uuid != "0")
            openmrsRest.getFull($scope.resource + "/sending/" + $stateParams.uuid).then(function (response) {
                $scope.sending = response;
                $scope.sending.date = new Date($scope.sending.date);
                openmrsRest.getFull($scope.resource + "/sendingDetail?sendingId=" + $scope.sending.id).then(function (response) {
                    $scope.lines = response.results;  
                    for(var i=0; i<$scope.lines.length; i++){
                        $scope.lines[i].itemExpiryDate = new Date($scope.lines[i].itemExpiryDate);
                        //$scope.lines[i].location = $scope.lines[i].item.pharmacyLocation.uuid;
                    }  
                    $scope.loading = false; 
                },function(e){
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });                           
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        else if($stateParams.order){
            $scope.sending.pharmacyOrder = $stateParams.order;
            $scope.loading = false;
        } else $scope.loading = false;

    }

    $scope.getData();

    $scope.addSendingLine = function(){
        $scope.lines.push({ 
            sending: $scope.sending.id, 
            sendingDetailsQuantity: 0, 
            item : { name: "" }, 
            sendingDetailsValue: 0,
            sendingItemBatch: "",
            sendingItemExpiryDate: null
        });
    }

    $scope.saveSending = function () {
        $scope.loading = true;
        $scope.sending.customer = $scope.sending.customer.id;
        $scope.sending.person = $scope.sending.person.uuid;
        $scope.sending.date = new Date($scope.sending.date);
        if ($scope.sending && $scope.sending.uuid) {    //Edit
            openmrsRest.update($scope.resource + "/sending", $scope.sending).then(function (response) {
                $scope.sending = response;
                $scope.getData();
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/sending", $scope.sending).then(function (response) {
                $scope.sending = response;
                $scope.getData();
                toastr.success('Data saved successfully.', 'Success');   
            },function(e) {
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });         
        }
    }

    $scope.saveSendingDetail = function (line, index) {
        $scope.loading = true;
        line.item = line.item.id;
        if (line && line.uuid) {    //Edit
            line.sending = line.sending.id;
            openmrsRest.update($scope.resource + "/sendingDetail", line).then(function (response) {
                response.sendingItemExpiryDate = new Date(response.sendingItemExpiryDate);
                $scope.lines[index] = response;
                //$scope.lines[index].location = $scope.lines[i].item.pharmacyLocation.uuid;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/sendingDetail", line).then(function (response) {
                response.sendingItemExpiryDate = new Date(response.sendingItemExpiryDate);
                $scope.lines[index] = response;
                //$scope.lines[index].location = $scope.lines[i].item.pharmacyLocation.uuid;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
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
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        }, function () {
            
        });  
    }

    $scope.deleteSendingDetail = function (sendingDetail, index) {
        if(sendingDetail.uuid){
            $scope.loading = true;
            openmrsRest.remove($scope.resource + "/sendingDetail", sendingDetail, "Generic Reason").then(function (response) {
                $scope.lines.splice(index,1);
                $scope.loading = false;
                toastr.success('Data removed successfully.', 'Success');
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {
            $scope.lines.splice(index,1);
        }    
    }    

    $scope.viewSending = function (data) {
        $state.go('home.despense', {
            uuid: data.uuid
        });
    }

}]);
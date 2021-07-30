angular.module('InventoryController', ['ngMaterial','ngAnimate', 'toastr', 'md.data.table']).controller('InventoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest','toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, toastr) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = { "Pharmacy management module": "", "Location": "locations" };
    $scope.loading = false;
    $scope.location = null;
    $scope.locations = [];
    $scope.orders = [];
    $scope.lines = [];
    $scope.receptions = [];
    $scope.reception = { pharmacyOrder: {} };

    $scope.getData = function () {
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/location").then(function (response) {
            $scope.locations = response.results;
            openmrsRest.getFull($scope.resource + "/order").then(function (response) {
                $scope.orders = response.results;
                if($stateParams.reception){
                    $scope.reception = $stateParams.reception;
                    openmrsRest.getFull($scope.resource + "/receptionDetail?receptionId=" + $scope.reception.id).then(function (response) {
                        $scope.lines = response.results;    
                        $scope.loading = false; 
                    },function(e){
                        $scope.loading = false;
                        toastr.error('An unexpected error has occured.', 'Error');
                    });
                } else { $scope.loading = false; }
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            })
        },function(e){
            $scope.loading = false;
            toastr.error('An unexpected error has occured.', 'Error');
        })
    }

    $scope.searchItems = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
            return response.results;
        }, function(e){
            return [];
        });
    };

    $scope.selectedItemChange = function (item,index) {
        $scope.lines[index].item = item;
    };

    $scope.getData();

    $scope.addReceptionLine = function(){
        $scope.lines.push({ reception: $scope.reception.id, item : { name: "" }, quantityReceived: 0 });
    }

    $scope.saveReception = function () {
        $scope.loading = true;
        if(!($scope.reception.pharmacyOrder && $scope.reception.pharmacyOrder.uuid))
            $scope.reception.pharmacyOrder = undefined; //delete it from payload
        if ($scope.reception && $scope.reception.uuid) {    //Edit
            openmrsRest.update($scope.resource + "/reception", $scope.reception).then(function (response) {
                $scope.reception = response;
                $scope.getData();
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/reception", $scope.reception).then(function (response) {
                $scope.reception = response;
                $scope.getData();
                toastr.success('Data saved successfully.', 'Success');   
            },function(e) {
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });         
        }
    }

    $scope.saveReceptionDetail = function (line, index) {
        $scope.loading = true;
        line.item = line.item.id;
        if (line && line.uuid) {    //Edit
            line.pharmacyReception = line.pharmacyReception.id;
            openmrsRest.update($scope.resource + "/receptionDetail", line).then(function (response) {
                $scope.lines[index] = response;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/receptionDetail", line).then(function (response) {
                $scope.lines[index] = response;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        }
    }

    $scope.deleteReception = function (reception) {
        var confirm = $mdDialog.confirm()
          .title('Confirmation')
          .textContent('Do you really want to delete this reception ?')
          .ok('Yes')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.loading = true;
            openmrsRest.remove($scope.resource + "/reception", reception, "Generic Reason").then(function (response) {
                loadData();
                toastr.success('Data removed successfully.', 'Success');
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        }, function () {
            
        });  
    }

    $scope.deteleReceptionDetail = function (receptionDetail, index) {
        if(receptionDetail.uuid){
            $scope.loading = true;
            openmrsRest.remove($scope.resource + "/receptionDetail", receptionDetail, "Generic Reason").then(function (response) {
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

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    }

}])
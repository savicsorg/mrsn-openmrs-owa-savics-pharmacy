angular.module('ReceptionController', ['ngMaterial','ngAnimate', 'toastr', 'md.data.table']).controller('ReceptionController', ['$scope', '$state', '$stateParams', '$rootScope', 'openmrsRest','toastr', 'gettextCatalog',  function ($scope, $state, $stateParams, $rootScope, openmrsRest, toastr, gettextCatalog) {
    $scope.resource = "savicspharmacy";
    $rootScope.links = { 
        "Pharmacy management module": "", 
        "Inventory": "index.html#!/inventory", 
        "Receptions": "index.html#!/receptions" 
    };
    $scope.loading = false;
    $scope.receptions = [];
    $scope.reception = { pharmacyOrder: { } };
    $scope.location = null;
    $scope.locations = [];
    $scope.orders = [];
    $scope.lines = [];
    $scope.searchText = "";
    $scope.options = {
        autoSelect: true,
        boundaryLinks: false,
        largeEditDialog: true,
        pageSelector: true,
        rowSelection: true,
        limit: [5, 10, 50, 100]
    };

    $scope.query = {
        limit: 5,
        page: 1,
        order: '-date'
    };

    $scope.logPagination = function (page, limit) {
        
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

    $scope.getData = function () {
        $scope.loading = true;
        console.log($stateParams);
        if($stateParams.uuid){
            openmrsRest.getFull($scope.resource + "/location").then(function (response) {
                $scope.locations = response.results;
                openmrsRest.getFull($scope.resource + "/order").then(function (response) {
                    $scope.orders = response.results;
                    if($stateParams.uuid && $stateParams.uuid != "0")
                        openmrsRest.getFull($scope.resource + "/reception/" + $stateParams.uuid).then(function (response) {
                            $scope.reception = response;
                            $scope.reception.date = new Date($scope.reception.date);
                            openmrsRest.getFull($scope.resource + "/receptionDetail?receptionId=" + $scope.reception.id).then(function (response) {
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
                        $scope.reception.pharmacyOrder = $stateParams.order;
                        console.log($scope.reception.pharmacyOrder);
                        $scope.loading = false;
                    } else $scope.loading = false;
                },function(e){
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                })
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {
            openmrsRest.getFull($scope.resource + "/reception").then(function (response) {
                $scope.receptions = response.results;
                $scope.loading = false;
            }, function(e){
                $scope.loading = false; 
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } 
    }

    $scope.getData();

    $scope.addReceptionLine = function(){
        $scope.lines.push({ reception: $scope.reception.id, quantityReceived: 0, item : { name: "" }, itemLineLocation: ""});
    }

    $scope.saveReception = function () {
        $scope.loading = true;
        //var query = JSON.parse(JSON.stringify($scope.reception));
        //query.receptionDetailList = $scope.lines;
        if(!($scope.reception.pharmacyOrder && $scope.reception.pharmacyOrder.id))
            $scope.reception.pharmacyOrder = undefined; //delete it from payload
        else $scope.reception.pharmacyOrder = $scope.reception.pharmacyOrder.id;
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
            var query = JSON.parse(JSON.stringify(line));
            query.reception = query.reception.id;
            openmrsRest.update($scope.resource + "/receptionDetail", query).then(function (response) {
                response.itemExpiryDate = new Date(response.itemExpiryDate);
                $scope.lines[index] = response;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/receptionDetail", query).then(function (response) {
                response.itemExpiryDate = new Date(response.itemExpiryDate);
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

    $scope.viewReception = function (data) {
        $state.go('home.reception', {
            uuid: data.uuid
        });
    }
}])

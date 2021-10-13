angular.module('ReceptionController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('ReceptionController', ['$scope', '$state', '$stateParams', '$rootScope', 'openmrsRest', 'toastr', 'gettextCatalog', '$translate', function ($scope, $state, $stateParams, $rootScope, openmrsRest, toastr, gettextCatalog, $translate) {
        $scope.resource = "savicspharmacy";
        $rootScope.links = {
            "Pharmacy management module": "",
            "Inventory": "index.html#!/inventory",
            "Receptions": "index.html#!/receptions"
        };
        $scope.loading = false;
        $scope.receptions = [];
        $scope.reception = {pharmacyOrder: {}};
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
            rowSelection: true
        };

        $scope.query = {
            limit: 5,
            page: 1
        };

        $scope.logPagination = function (page, limit) {

        }

        $scope.getDetails = function(id){
            if(id){
                openmrsRest.getFull($scope.resource + "/orderDetail?orderId=" + id).then(function (response) {
                    $scope.lines = [];
                    for(var i=0; i<response.results.length; i++){
                        $scope.lines.push({
                            reception: $scope.reception.id, 
                            quantityReceived: response.results[i].orderLineQuantity, 
                            item: response.results[i].item, 
                            itemLineLocation: "",
                            itemExpiryDate: new Date()
                        });
                    }
                }, function (e) {
                    $scope.lines = [];
                });
            }
        }

        $scope.searchItems = function (searchText) {
            return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
                return response.results.filter(function(item){
                    for(var i=0; i<$scope.lines.length; i++){
                        if($scope.lines[i].item.id == item.id)
                            return false;
                    }
                    return true;
                });
            }, function (e) {
                return [];
            });
        };

        $scope.selectedItemChange = function (item, index) {
            $scope.lines[index].item = item;
        };

        $scope.getData = function () {
            $scope.loading = true;
            if ($stateParams.uuid) {
                openmrsRest.getFull($scope.resource + "/location").then(function (response) {
                    $scope.locations = response.results;
                    openmrsRest.getFull($scope.resource + "/order?notReceived=1").then(function (response) {
                        $scope.orders = response.results;
                        if ($stateParams.uuid && $stateParams.uuid != "0")
                            openmrsRest.getFull($scope.resource + "/reception/" + $stateParams.uuid).then(function (response) {
                                response.date = new Date(response.date);
                                $scope.reception = response;
                                openmrsRest.getFull($scope.resource + "/receptionDetail?receptionId=" + $scope.reception.id).then(function (response) {
                                    $scope.lines = response.results;
                                    for (var i = 0; i < $scope.lines.length; i++) {
                                        $scope.lines[i].itemExpiryDate = new Date($scope.lines[i].itemExpiryDate);
                                    }
                                    $scope.loading = false;
                                }, function (e) {
                                    $scope.loading = false;
                                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                                });
                            }, function (e) {
                                $scope.loading = false;
                                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                            });
                        else if ($stateParams.order) {
                            $scope.reception.pharmacyOrder = $stateParams.order;
                            console.log($scope.reception.pharmacyOrder);
                            $scope.loading = false;
                        } else
                            $scope.loading = false;
                    }, function (e) {
                        $scope.loading = false;
                        toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                    })
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            } else {
                openmrsRest.getFull($scope.resource + "/reception").then(function (response) {
                    $scope.receptions = response.results;
                    $scope.loading = false;
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            }
        }

        $scope.getData();

        $scope.addReceptionLine = function () {
            $scope.lines.push({reception: $scope.reception.id, quantityReceived: 0, item: {name: ""}, itemLineLocation: ""});
        }

        $scope.saveReception = function () {
            $scope.loading = true;
            var query = JSON.parse(JSON.stringify($scope.reception));
            if (!(query.pharmacyOrder && query.pharmacyOrder.id > 0))
                query.pharmacyOrder = undefined; //delete it from payload
            else
                query.pharmacyOrder = query.pharmacyOrder.id;
            query.date = new Date(query.date);
            query.receptionDetails = [];
            if ($scope.reception.id > 0 && $scope.lines && $scope.lines.length > 0) {
                for (var l in $scope.lines) {
                    var myLine = {
                        "item": $scope.lines[l].item.id,
                        //"reception": $scope.reception.id,
                        "quantityReceived": $scope.lines[l].quantityReceived,
                        "itemBatch": $scope.lines[l].itemBatch,
                        "itemExpiryDate": new Date($scope.lines[l].itemExpiryDate),
                        "itemLineLocation": $scope.lines[l].itemLineLocation
                    }
                    query.receptionDetails.push(myLine);
                }
            }            
            if (query.reception && query.uuid) {    //Edit
                openmrsRest.update($scope.resource + "/reception", query).then(function (response) {
                    $scope.reception = response;
                    toastr.success($translate.instant('Data saved successfully.'), $translate.instant('Success'));                    
                    $state.go("home.receptions", {});
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            } else {    //Creation
                openmrsRest.create($scope.resource + "/reception", query).then(function (response) {
                    $scope.reception = response;
                    $scope.getDetails($scope.reception.pharmacyOrder.id);
                    toastr.success($translate.instant('Data saved successfully.'), $translate.instant('Success'));                   
                    $state.go("home.receptions", {});
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            }
        }

        $scope.deleteReception = function (reception) {
            var confirm = $mdDialog.confirm()
                    .title($translate.instant('Confirmation'))
                    .textContent($translate.instant($translate.instant('Do you really want to delete this reception ?')))
                    .ok($translate.instant('Yes'))
                    .cancel($translate.instant('Cancel'));
            $mdDialog.show(confirm).then(function () {
                $scope.loading = true;
                openmrsRest.remove($scope.resource + "/reception", reception, "Generic Reason").then(function (response) {
                    loadData();
                    toastr.success($translate.instant('Data removed successfully.'), $translate.instant('Success'));
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            }, function () {

            });
        }

        $scope.viewReception = function (data) {
            $state.go('home.reception', {
                uuid: data.uuid
            });
        }
    }])

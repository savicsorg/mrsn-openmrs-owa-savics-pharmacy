angular.module('OrderController', ['ngMaterial', 'ngAnimate', 'toastr']).controller('OrderController', ['$scope', '$rootScope', '$mdToast', '$state', '$stateParams', '$mdDialog', 'openmrsRest', 'toastr', '$translate', function ($scope, $rootScope, $mdToast, $state, $stateParams, $mdDialog, openmrsRest, toastr, $translate) {
    $scope.rootscope = $rootScope;
    $scope.resource = "savicspharmacy";
    $rootScope.links = {};
    $rootScope.links["Pharmacy management module"] = "";
    $rootScope.links["Orders"] = "index.html#!/orders";
    $scope.order = { supplier: {}, person: {} };
    $scope.suppliers = [];
    $scope.orders = [];
    $scope.loading = false;
    $scope.loadingStack = 0;
    $scope.item = null;
    $scope.lines = [];
    $scope.approveBtn = {
        text: $translate.instant("Approve"),
        enabled: false,
        visible: false
    };
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

    var _ = require("underscore");

    $scope.searchItems = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
            return response.results;
        }, function (e) {
            return [];
        });
    };

    $scope.selectedItemChange = function (item, index) {
        $scope.lines[index].item = item;
        $scope.lines[index].orderLineAmount = item.sellPrice * $scope.lines[index].orderLineQuantity;
    };

    $scope.lineQuantityChange = function (index) {        
        $scope.lines[index].orderLineAmount = $scope.lines[index].item.sellPrice * $scope.lines[index].orderLineQuantity;
        $scope.updateOrderAmount();
    };

    $scope.view = function (data) {
        $state.go('home.order', { order: data });
    }

    $scope.receive = function(order){
        $state.go('home.reception', { order: order, uuid: "0" });
    }

    $scope.openView = function (data) {
        $state.go('home.orderview', {
            id: data.id,
            supplier: data.supplier,
            name: data.name
        });
    }

    function loadData() {
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/supplier").then(function (response) {
            $scope.suppliers = response.results;
            if ($stateParams.order) {
                $scope.order = $stateParams.order;
                openmrsRest.getFull($scope.resource + "/orderDetail?orderId=" + $scope.order.id).then(function (response) {
                    $scope.lines = response.results;
                    $scope.updateOrderAmount();
                    if ($scope.order.dateApprobation !== null) {
                        $scope.approveBtn.text = $translate.instant("Approved on ") + new Date($scope.order.dateApprobation).toLocaleDateString();
                        $scope.approveBtn.enabled = false;
                        $scope.approveBtn.visible = true;
                        $scope.loading = false;
                    } else {
                        openmrsRest.getFull("session").then(function (response) {
                            if ($rootScope.account.role === 1 || $rootScope.account.role === 3) {//admin or approuver
                                $scope.approveBtn.text = $translate.instant("Approve");
                                $scope.approveBtn.enabled = true;
                                $scope.approveBtn.visible = true;
                                $scope.loading = false;
                            } else {
                                $scope.approveBtn.visible = false;
                                $scope.loading = false;
                            }
                        }, function (e) {
                            $scope.loading = false;
                            toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                        });
                    }
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            } else {
                openmrsRest.getFull($scope.resource + "/order").then(function (response) {
                    $scope.orders = response.results;
                    $scope.loading = false;
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            }
        }, function (e) {
            $scope.loading = false;
            toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
        });
    }

    loadData();

    $scope.addOrderLine = function () {
        $scope.lines.push({ pharmacyOrder: $scope.order.id, item: { name: "" }, itemSoh: 0, itemAmc: 0 });
    }

    $scope.approve = function () {
        $mdDialog.show($mdDialog.confirm()
        .title($translate.instant('Confirmation'))
        .textContent($translate.instant('Do you really want to approve this order ?'))
        .ok($translate.instant('Yes'))
        .cancel($translate.instant('Cancel'))).then(function () {
            $scope.order.dateApprobation = new Date();
            $scope.saveOrder(true);
        }, function () {
            
        });
        
    }

    $scope.saveOrder = function (approve = false) {
        $scope.loading = true;
        $scope.order.supplier = $scope.order.supplier.id;
        var query = JSON.parse(JSON.stringify($scope.order));
        query.orderDetails = [];
        if ($scope.lines && $scope.lines.length > 0) {
            for (var l in $scope.lines) {
                var myLine = {
                    "item": $scope.lines[l].item.id,
                    "pharmacyOrder": $scope.order.id,
                    "orderLineQuantity": $scope.lines[l].orderLineQuantity,
                    "orderLineAmount": $scope.lines[l].orderLineAmount
                }
                query.orderDetails.push(myLine);
            }
        }
        if ($scope.order && $scope.order.uuid) {    //Edit
            openmrsRest.update($scope.resource + "/order", query).then(function (response) {
                $scope.order = response;
                loadData();
                $state.go('home.orders', { });
                //toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                console.error(e);
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/order", query).then(function (response) {
                $scope.order = response;
                loadData();
                $state.go('home.orders', { });
                //toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
            });
        }
    }

    $scope.updateOrderAmount = function() {
        $scope.order.amount = _.reduce($scope.lines, function(result, line){ return result + line.orderLineAmount; }, 0);
    }

    $scope.deleteOrder = function (order) {
        var confirm = $mdDialog.confirm()
            .title($translate.instant('Confirmation'))
            .textContent($translate.instant('Do you really want to delete this order ?'))
            .ok($translate.instant('Yes'))
            .cancel($translate.instant('Cancel'));
        $mdDialog.show(confirm).then(function () {
            $scope.loading = true;
            openmrsRest.remove($scope.resource + "/order", order, "Generic Reason").then(function (response) {
                loadData();
                toastr.success($translate.instant("Data removed successfully."), $translate.instant('Success'));
            }, function (e) {
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
            });
        }, function () {

        });

    }

    $scope.deleteOrderDetail = function (index) {
        $scope.lines.splice(index,1);
        $scope.updateOrderAmount();  
    }
}]);

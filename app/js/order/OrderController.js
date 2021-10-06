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
        console.log($scope.lines);
    };

    $scope.view = function (data) {
        $state.go('home.order', { order: data });
    }

    $scope.receive = function(order){
        console.log({ order: order, uuid: "0" });
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
                        $scope.approveBtn.text = "Approved on " + new Date($scope.order.dateApprobation).toLocaleDateString();
                        $scope.approveBtn.enabled = false;
                        $scope.approveBtn.visible = true;
                        $scope.loading = false;
                    } else {
                        openmrsRest.getFull("session").then(function (response) {
                            if (_.some(response.user.roles, function (item) { return item.display === "Approve Orders" || item.name === "Approve Orders"; })) {
                                $scope.approveBtn.text = "Approve";
                                $scope.approveBtn.enabled = true;
                                $scope.approveBtn.visible = true;
                                $scope.loading = false;
                            } else {
                                $scope.approveBtn.visible = false;
                                $scope.loading = false;
                            }
                        }, function (e) {
                            $scope.loading = false;
                            showToast($translate.instant("An unexpected error has occured."), "error");

                        });
                    }
                }, function (e) {
                    $scope.loading = false;
                    showToast($translate.instant("An unexpected error has occured."), "error");
                });
            } else {
                openmrsRest.getFull($scope.resource + "/order").then(function (response) {
                    $scope.orders = response.results;
                    $scope.loading = false;
                }, function (e) {
                    $scope.loading = false;
                    showToast($translate.instant("An unexpected error has occured."), "error");
                });
            }
        }, function (e) {
            $scope.loading = false;
            showToast($translate.instant("An unexpected error has occured."), "error");
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
                $scope.saveOrder();
            }, function () {

            });

    }

    $scope.saveOrder = function () {
        $scope.loading = true;
        var query = JSON.parse(JSON.stringify($scope.order));
        query.supplier = ($scope.order.supplier) ? $scope.order.supplier.id : null;
        query.orderDetails = [];

        if ($scope.lines && $scope.lines.length > 0) {
            for (var l in $scope.lines) {
                var myLine = {
                    "pharmacyOrder": $scope.lines[l].pharmacyOrder.id,
                    "item": $scope.lines[l].item.id,
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
                showToast($translate.instant("Data saved successfully."), "success");
            }, function (e) {
                console.error(e);
                $scope.loading = false;
                showToast($translate.instant("An unexpected error has occured."), "error");
            });
        } else {    //Creation
            openmrsRest.create($scope.resource + "/order", query).then(function (response) {
                $scope.order = response;
                loadData();
                showToast($translate.instant("Data saved successfully."), "success");
            }, function (e) {
                $scope.loading = false;
                showToast($translate.instant("An unexpected error has occured."), "error");
            });
        }
    }

    $scope.updateOrderAmount = function () {
        $scope.order.amount = _.reduce($scope.lines, function (result, line) { return result + line.orderLineAmount; }, 0);
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
                showToast($translate.instant("Data removed successfully."), "success");
            }, function (e) {
                $scope.loading = false;
                showToast($translate.instant("An unexpected error has occured."), "error");
            });
        }, function () {

        });

    }

    $scope.deteleOrderDetail = function (orderDetail, index) {
        console.log("deleted detail index: " + index);
        if (orderDetail.uuid) {
            $scope.loading = true;
            openmrsRest.remove($scope.resource + "/orderDetail", orderDetail, "Generic Reason").then(function (response) {
                $scope.lines.splice(index, 1);
                $scope.updateOrderAmount();
                $scope.loading = false;
                showToast($translate.instant("Data removed successfully."), "success");

            }, function (e) {
                $scope.loading = false;
                showToast($translate.instant("An unexpected error has occured."), "error");
            });
        } else {
            $scope.lines.splice(index, 1);
            $scope.updateOrderAmount();
        }
    }

    function showToast(msg, type) {
        $mdToast.show(
            $mdToast.simple()
                .content(msg)
                .theme(type + "-toast")
                .position('top right')
                .hideDelay(3000))
            .then(function () {
                $log.log($translate.instant('Toast dismissed.'));
            }).catch(function () {
                $log.log($translate.instant('Toast failed or was forced to close early by another toast.'));
            });
    }
}]);

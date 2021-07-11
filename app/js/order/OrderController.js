angular.module('OrderController', ['ngMaterial','ngAnimate', 'toastr']).controller('OrderController', ['$scope', '$rootScope', '$state', '$stateParams', 'openmrsRest', 'toastr', function ($scope, $rootScope, $state, $stateParams, openmrsRest, toastr) {
    $scope.rootscope = $rootScope;
    console.log("OrderController new form ---")
    $scope.resource = "savicspharmacy";
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Orders"] = "orders";
    $scope.order = { supplier: {}, person: {} };
    $scope.suppliers = [];
    $scope.orders = [];
    $scope.loading = false;
    $scope.item = null;
    $scope.lines = [];
    var _ = require("underscore");

    $scope.searchItems = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
            return response.results;
        }, function(e){
            return [];
        });
    };

    $scope.selectedItemChange = function (item,index) {
        $scope.lines[index].item = item;
        console.log($scope.lines);
    };

    $scope.view = function(data){
        $state.go('home.order', { order: data });
    }

    $scope.receive = function(data){
        $state.go('home.receive', { order: data });
    }

    function loadData() {
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/supplier").then(function (response) {
            $scope.suppliers = response.results;  
            console.log($stateParams);
            if($stateParams.order){
                $scope.order = $stateParams.order;
                openmrsRest.getFull($scope.resource + "/orderDetail?orderId=" + $scope.order.id).then(function (response) {
                    $scope.lines = response.results;     
                    $scope.updateOrderAmount();
                    $scope.loading = false; 
                },function(e){
                    console.error(e);
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            } else {
                openmrsRest.getFull($scope.resource + "/order").then(function (response) {
                    $scope.orders = response.results;     
                    $scope.loading = false; 
                },function(e){
                    console.error(e);
                    $scope.loading = false;
                    toastr.error('An unexpected error has occured.', 'Error');
                });
            }
        },function(e){
            console.error(e);
            $scope.loading = false;
            toastr.error('An unexpected error has occured.', 'Error');
        });
    }

    loadData();

    $scope.addOrderLine = function(){
        $scope.lines.push({ pharmacyOrder: $scope.order.id, item : { name: "" }, itemSoh: 0, itemAmc: 0 });
    }

    $scope.saveOrder = function () {
        $scope.loading = true;
        console.log($scope.order);
        $scope.order.supplier = $scope.order.supplier.id;
        if ($scope.order && $scope.order.uuid) {    //Edit
            console.log("Updating the order ", $scope.order.uuid)
            openmrsRest.update($scope.resource + "/order", $scope.order).then(function (response) {
                console.log(response);
                $scope.order = response;
                loadData();
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                console.error(e);
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            console.log("Creating new order ");
            openmrsRest.create($scope.resource + "/order", $scope.order).then(function (response) {
                console.log(response);
                response.acquisitionDate = new Date(response.acquisitionDate);
                $scope.order = response;
                loadData();
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                console.error(e);
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });         
        }
    }

    $scope.updateOrderAmount = function() {
        $scope.order.amount = _.reduce($scope.lines, function(result, line){ return result + line.orderLineAmount; }, 0);
    }

    $scope.saveOrderDetail = function (line, index) {
        $scope.loading = true;
        line.item = line.item.id;
        if (line && line.uuid) {    //Edit
            console.log("Updating the order detail", line.uuid)
            openmrsRest.update($scope.resource + "/orderDetail", line).then(function (response) {
                console.log(response);
                $scope.lines[index] = response;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                console.error(e);
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {    //Creation
            console.log("Creating new order detail");
            openmrsRest.create($scope.resource + "/orderDetail", line).then(function (response) {
                console.log(response);
                $scope.lines[index] = response;
                $scope.loading = false;
                toastr.success('Data saved successfully.', 'Success');   
            },function(e){
                console.error(e);
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        }
    }

    $scope.deleteOrder = function (order) {
        $scope.loading = true;
        console.log(order)
        openmrsRest.remove($scope.resource + "/order", order, "Generic Reason").then(function (response) {
            console.log(response);
            loadData();
            toastr.success('Data removed successfully.', 'Success');
        },function(e){
            console.error(e);
            $scope.loading = false;
            toastr.error('An unexpected error has occured.', 'Error');
        });
    }

    $scope.deteleOrderDetail = function (orderDetail, index) {
        console.log("deleted detail index: " + index);
        if(orderDetail.uuid){
            $scope.loading = true;
            console.log(orderDetail)
            openmrsRest.remove($scope.resource + "/orderDetail", orderDetail, "Generic Reason").then(function (response) {
                console.log(response);
                $scope.lines.splice(index,1);   
                $scope.updateOrderAmount();
                $scope.loading = false;
                toastr.success('Data removed successfully.', 'Success');
            },function(e){
                console.error(e);
                $scope.loading = false;
                toastr.error('An unexpected error has occured.', 'Error');
            });
        } else {
            $scope.lines.splice(index,1);
            $scope.updateOrderAmount();
        }    
    }

}]);

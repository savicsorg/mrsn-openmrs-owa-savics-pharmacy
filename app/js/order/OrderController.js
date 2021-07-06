angular.module('OrderController', ['ngMaterial','ngAnimate', 'toastr']).controller('OrderController', ['$scope', '$rootScope', '$state', '$stateParams', 'openmrsRest', 'toastr', function ($scope, $rootScope, $state, $stateParams, openmrsRest, toastr) {
    $scope.rootscope = $rootScope;
    console.log("OrderController new form ---")
    //Breadcrumbs properties
    $scope.resource = "savicsgmao";
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Orders"] = "orders";
    $scope.order = { department: {}, orderType: {} };
    $scope.departments = [];
    $scope.suppliers = [];
    $scope.orders = [];
    $scope.loading = false;
    $scope.searchText = "";

    $scope.searchItems = function (searchText) {
        return openmrsRest.getFull($scope.resource + "/item?name=" + searchText).then(function (response) {
            return response.results;
        });
    };

    function loadData() {
        $scope.loading = true;
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            $scope.orderTypes = response.results;
            openmrsRest.getFull($scope.resource + "/supplier").then(function (response) {
                $scope.departments = response.results;  
                console.log($stateParams);
                if($stateParams.order){
                    $scope.order = $stateParams.order;
                    $scope.loading = false; 
                }   else {
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
        },function(e){
            console.error(e);
            $scope.loading = false;
            toastr.error('An unexpected error has occured.', 'Error');
        });
    }

    loadData();

    $scope.view = function (order) {
        order.acquisitionDate = new Date(order.acquisitionDate);
        $state.go('home.order', { order: order });
    }

    $scope.movement = function (order) {
        $state.go('home.operation', { order: order });
    }

    $scope.maintenance = function (order) {
        $state.go('home.maintenance', { order: order });
    }

    $scope.saveOrder = function () {
        $scope.loading = true;
        if(!$scope.order.orderStatus) $scope.order.orderStatus = 1;
        if(!$scope.order.providerId) $scope.order.providerId = 1;
        $scope.order.acquisitionDate = new Date($scope.order.acquisitionDate);
        $scope.order.department = $scope.order.department.id;
        $scope.order.orderType = $scope.order.orderType.id;
        if ($scope.order && $scope.order.uuid) {    //Edit
            console.log("Updating the order ", $scope.order.uuid)
            openmrsRest.update($scope.resource + "/order", $scope.order).then(function (response) {
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
}]);

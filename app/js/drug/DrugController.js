angular.module('DrugController', []).controller('DrugController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Drugs": "drugs", "New": "drug" };

    var vm = this;
    vm.appTitle = "New Drug entry";

    var type = "";
    var msg = "";
    vm.drug = {};
    $scope.item = null;

    if ($stateParams.uuid) {
        //we are in edit mode
        vm.drug = $stateParams;
        $scope.drug_type_id = vm.drug.unit.id;
        $scope.drug_route_id = vm.drug.route.id;
        $scope.item = { display: vm.drug.name, uuid: vm.drug.uuid };
        $scope.selectedItem = vm.drug.name;
        vm.appTitle = "Edit type entry";
    }

    $scope.drug = function () {
        vm.drug.virtualstock = 1;
        vm.drug.soh = 1;
        console.log(vm.drug);
        // if (!vm.drug.name || !vm.drug.code || !vm.drug.description || !vm.drug.buy_price || !vm.drug.sell_price || !vm.drug.stock_min || !vm.drug.stock_max || !vm.drug.type.id || !vm.drug.route.id) {
        //     type = "error";
        //     msg = "Please check if your input are valid ones."
        //     showToast(msg, type);
        //     return;
        // }
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = $stateParams.uuid ? { virtualstock: vm.drug.virtualstock, name: vm.drug.name, code: vm.drug.code, description: vm.drug.description, buyPrice: addZeroes(vm.drug.buyPrice), sellPrice: addZeroes(vm.drug.sellPrice), uuid: vm.drug.uuid, soh: vm.drug.soh, stockMin: vm.drug.stockMin, stockMax: vm.drug.stockMax, unit: vm.drug.type.id, route: vm.drug.route.id } : { virtualstock: vm.drug.virtualstock, name: vm.drug.name, code: vm.drug.code, description: vm.drug.description, buyPrice: addZeroes(vm.drug.buyPrice), sellPrice: addZeroes(vm.drug.sellPrice), soh: vm.drug.soh, stockMin: vm.drug.stockMin, stockMax: vm.drug.stockMax, unit: vm.drug.type.id, route: vm.drug.route.id };

        if ($stateParams.uuid) {
            openmrsRest.update($scope.resource + "/item", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
        } else {
            openmrsRest.create($scope.resource + "/item", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
        }
    }

    function handleResponse(response, e = null) {
        document.getElementById("loading_submit").style.visibility = "hidden";
        if (e) {
            type = "error";
            msg = e.data.error.message;
            showToast(msg, type);
            return;
        }
        if (response.uuid) {
            type = "success";
            msg = $stateParams.uuid ? response.name + " is Well edited." : response.name + " is Well saved.";
            vm.drug.name = "";
            vm.drug.code = "";
            vm.drug.address = "";
            vm.drug.email = "";
            vm.drug.tel = "";
            vm.drug.unit = "";
            vm.drug.route = "";
            vm.drug.buyPrice = "";
            vm.drug.sellPrice = "";
            vm.drug.stockMin = "";
            vm.drug.stockMax = "";
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.drugs')
        }
        $mdToast.show(
            $mdToast.simple()
                .content(msg)
                .theme(type + "-toast")
                .position('top right')
                .hideDelay(3000))
            .then(function () {
                $log.log('Toast dismissed.');
            }).catch(function () {
                $log.log('Toast failed or was forced to close early by another toast.');
            });
    }

    $scope.getMatches = function (searchText) {
        return openmrsRest.getFull("drug?q=" + searchText).then(function (response) {
            return response.results;
        });
    };

    $scope.selectedItemChange = function (item) {
        if (item) {
            vm.drug.name = item.name;
            vm.drug.uuid = item.uuid;
        }
    }

    function addZeroes(num) {
        return num + 0.01;
    }

    $scope.routes = function () {
        openmrsRest.getFull($scope.resource + "/route").then(function (response) {
            vm.routes = response.results;
        });
    }

    $scope.units = function () {
        openmrsRest.getFull($scope.resource + "/unit").then(function (response) {
            vm.units = response.results;
        });
    }

    $scope.routes();
    $scope.units();

}]);
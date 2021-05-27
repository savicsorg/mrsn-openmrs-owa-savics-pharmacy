angular.module('DrugController', []).controller('DrugController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmacy";
    $scope.concept_ressource = "concept";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Drugs": "drugs", "New": "drug" };

    var vm = this;
    vm.appTitle = "New Drug entry";

    var type = "";
    var msg = "";

    if ($stateParams.uuid) {
        //we are in edit mode
        vm.drug = $stateParams;
        vm.appTitle = "Edit type entry";
    }

    $scope.drug = function () {

        // "name": "Item 1",
        // "code": "IT003",
        // "description": "Desc Item 1",
        // "buyPrice": 200.0,
        // "sellPrice": 200.0,
        // "virtualstock": 20,
        // "soh": 3,
        // "stockMin": 0,
        // "stockMax": 2000,
        // "unit": 1,
        // "route": 1
        console.log(searchText);
        console.log(vm.drug);
        return;

        if (!vm.drug.name || !vm.drug.code || !vm.drug.description || !vm.drug.buyPrice || !vm.drug.sellPrice || !vm.drug.virtualstock || !vm.drug.soh || !vm.drug.stockMin || !vm.drug.stockMax || !vm.drug.unit || !vm.drug.route) {
            type = "error";
            msg = "Please check if your input are valid ones."
            showToast(msg, type);
            return;
        }
        document.getElementById("loading_submit").style.visibility = "visible";



        var payload = $stateParams.uuid ? { name: vm.drug.name, code: vm.drug.code, description: vm.drug.description, buyPrice: vm.drug.buyPrice, sellPrice: vm.drug.sellPrice, uuid: vm.drug.uuid, uuid: vm.drug.uuid, uuid: vm.drug.uuid, uuid: vm.drug.uuid, uuid: vm.drug.uuid, uuid: vm.drug.uuid, uuid: vm.drug.uuid } : { name: vm.drug.name, code: vm.drug.code, address: vm.drug.address, email: vm.drug.email, tel: vm.drug.tel };

        if ($stateParams.uuid) {
            openmrsRest.update($scope.resource + "/drug", payload).then(function (response) {
                handleResponse(response)
            }).catch(function (e) {
                handleResponse(response, e)
            });
        } else {
            openmrsRest.create($scope.resource + "/drug", payload).then(function (response) {
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
        return openmrsRest.getFull($scope.concept_ressource + "?q=" + searchText).then(function (response) {
            return response.results;
        });
    };

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
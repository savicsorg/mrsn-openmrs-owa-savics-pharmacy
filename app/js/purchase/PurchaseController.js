angular.module('PurchaseController', []).controller('PurchaseController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des achats";
    $scope.resource = "savicspharmacy";
    $scope.concept_ressource = "concept";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "New": "purchase" };
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

    var vm = this;
    vm.appTitle = "Order to Supplier";

    var type = "";
    var msg = "";
    vm.purchase = {};

    $scope.choices = [
        { "id": 1, "type": "Acetaminophen", "name": "" }
    ];

    $scope.index = $scope.choices.length;

    $scope.addNewChoice = function () {
        var newItemNo = ++$scope.index;
        $scope.choices.push({ 'id': newItemNo, "type": "Acetaminophen", "name": "" });
    };

    $scope.removeChoice = function (id) {
        if ($scope.choices.length <= 1) {
            alert("input cannot be less than 1");
            return;
        }
        var index = -1;
        var comArr = eval($scope.choices);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.choices.splice(index, 1);
    };

    $scope.getAllSupplier = function () {
        openmrsRest.getFull($scope.resource + "/supplier").then(function (response) {
            vm.suppliers = response.results;
        })
    }

    $scope.getAllSupplier();

    $scope.getMatches = function (searchText) {
        return openmrsRest.getFull($scope.concept_ressource + "?q=" + searchText).then(function (response) {
            return response.results;
        });
    };

    $scope.selectedItemChange = function (item) {
        if (item) {
            vm.drug.name = (item.name) ? item.name.display : item.display;
            vm.drug.uuid = (item.name) ? item.name.uuid : item.uuid;
        }
    }

    $scope.units = function () {
        openmrsRest.getFull($scope.resource + "/unit").then(function (response) {
            vm.units = response.results;
        });
    }

    $scope.units();


    $scope.purchase = function () {
        vm.purchase.virtualstock = 1;
        vm.purchase.soh = 1;
        console.log(vm.purchase);
        document.getElementById("loading_submit").style.visibility = "visible";

        var payload = vm.purchase;

        openmrsRest.create($scope.resource + "/item", payload).then(function (response) {
            handleResponse(response)
        }).catch(function (e) {
            handleResponse(response, e)
        });

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


}]);
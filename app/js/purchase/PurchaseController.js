angular.module('PurchaseController', []).controller('PurchaseController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des achats";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "New": "purchase" };

    var vm = this;
    vm.appTitle = "Order to Supplier";


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

}]);
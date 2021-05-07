angular.module('PurchaseController', []).controller('PurchaseController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des achats";
    $scope.resource = "savicspharmcy/purchase";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["New"] = "/purchase";

    var vm = this;
    vm.appTitle = "Order to Supplier";
    vm.resource = "savicspharmcy/purchase";


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


}]);
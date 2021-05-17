angular.module('DispenseController', []).controller('DispenseController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des drugs";
    $scope.resource = "savicspharmcy/dispense";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Dispense": "dispense" };

    var vm = this;
    vm.appTitle = "Dispension";
    vm.resource = "savicspharmcy/dispense";

    vm.batches = [
        { id: "1", name: "ASSE13" },
        { id: "2", name: "FRD23F" },
        { id: "3", name: "FRDR23" }
    ];

    vm.units = [
        { id: "1", name: "Box" },
        { id: "2", name: "Tablets" },
        { id: "3", name: "Capsules" },
        { id: "4", name: "Enrob tablets" },
        { id: "5", name: "Flacon" },
        { id: "6", name: "Sachets" },
        { id: "7", name: "Platelets" }
    ];

    vm.dispense_types = [
        { id: "1", name: "Patient" },
        { id: "2", name: "Internal Service" }
    ];

    vm.drugs = [
        "Acetaminophen",
        "Parcetamol"
    ];

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


    $scope.selectDispensationType = function (type) {
        if (type == "1") {
            vm.appTitle = "Drug to a Patient";
            vm.customer_name = "Julius Gakwaya";
        } else {
            vm.appTitle = "Drug to internal service";
            vm.customer_name = "Maternity";
        }
    }

}]);
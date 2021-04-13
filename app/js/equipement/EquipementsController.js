angular.module('EquipementController', []).controller('EquipementController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
    $scope.rootscope = $rootScope;
    
    console.log("EquipementController new form ---")
    $scope.appTitle = "Gestion des equipements";
    $scope.resource = "savicsgmao/agent";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Equipements"] = "/equipements";
    
    
    
    var vm = this;
    vm.appTitle = "Gestion des equipements";
    vm.resource = "savicsgmao/agent";
    $scope.departments = [
        { department_id: 1, name: 'Department 1'},
        { department_id: 2, name: 'Department 2'}
    ];
    $scope.equipmentTypes = [
        { equipment_type_id: 1, name: 'Type 1'},
        { equipment_type_id: 2, name: 'Type 2'}
    ];

    
    //TODO replace this by real data comming from openmrsRest
    $scope.equipements = [
        {"serialnumber": "11KH34567", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "XD1276578", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "567HJG878", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "YTU78645G", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "76GFH6VHB", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"}
    ];
    
}]);
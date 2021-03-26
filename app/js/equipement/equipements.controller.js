
EquipementsController.$inject = ['$scope', '$rootScope', 'openmrsRest'];

export default function EquipementsController($scope, $rootScope, openmrsRest) {

    var vm = this;
    $scope.myAgents = [{}];
    vm.appTitle = "Gestion des equipements";
    vm.resource = "savicsgmao/agent";

    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Equipements"] = "/equipements";
    
    //TODO replace this by real data comming from openmrsRest
    vm.datas = [
        {"serialnumber": "11KH34567", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "XD1276578", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "567HJG878", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "YTU78645G", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
        {"serialnumber": "76GFH6VHB", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"}
    ];
}


class EquipementsController {
    constructor() {
        var vm = this;
        vm.appTitle = "Gestion des equipements";
        vm.resource = "conceptsource";
        vm.datas = [
            {"serialnumber": "11KH34567", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
            {"serialnumber": "XD1276578", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
            {"serialnumber": "567HJG878", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
            {"serialnumber": "YTU78645G", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"},
            {"serialnumber": "76GFH6VHB", "designation": "Toyota Hilux", "type": "Vehicule", "localization": "Bureau MCD", "status": "En service", "lastModified": "2020-03-12"}
        ];

        $scope.query = {
            limit: 50,
            page: 1,
            order: "-lastModified"
        };

    }
}

export default EquipementsController;

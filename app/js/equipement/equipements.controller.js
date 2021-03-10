class EquipementsController {
    constructor() {
        var vm = this;
        vm.appTitle = "Gestion des equipements";
        vm.resource = "conceptsource";
        vm.columns= [
            {
                "property": "name",
                "label": "Name"
            },
            {
                "property": "hl7Code",
                "label":"HL7 Code"
            },
            {
                "property": "description",
                "label":"Description"
            }];
        vm.actions = [
            {
                "action":"edit",
                "label":"Edit",
                "link":"#/source/{uuid}"
            },
            {
                "action":"retire",
                "label":"Retire"
            },
            {
                "action":"unretire",
                "label":"unretire"
            },
            {
                "action":"purge",
                "label":"Delete",
                "icon":"icon-thumbs-down delete-action"
            }
        ];
    }
}

export default EquipementsController;

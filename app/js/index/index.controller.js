IndexController.$inject = ['openmrsTranslate'];

export default function IndexController(openmrsTranslate) {

    var vm = this;

    vm.appTitle = "Inventory maintenance management";
    vm.links = {};
    vm.links["Home"] = "";

    vm.changeLanguage = function (langKey) {
       return openmrsTranslate.changeLanguage(langKey);
    };

}
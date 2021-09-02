angular.module('ReceiveController', []).controller('ReceiveController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "Gestion des Receives";
    $scope.resource = "savicspharmcy/receives";
    //Breadcrumbs properties
    $rootScope.links = {};
    $rootScope.links["Home"] = "";
    $rootScope.links["Receives"] = "/receives";

    var vm = this;
    vm.appTitle = "Gestion des Receives";
    vm.resource = "savicspharmcy/receives";
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

    //TODO replace this by real data comming from openmrsRest
    $scope.receives = [
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "N/A", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" },
        { code: "N02BE01", supplier: "Kipharma", approbation: "2021-01-07", reception: "2021-01-07", total: "50000" }
    ];

    $scope.openView = function () {
        $state.go('home.purchase', {});
    }

}]);
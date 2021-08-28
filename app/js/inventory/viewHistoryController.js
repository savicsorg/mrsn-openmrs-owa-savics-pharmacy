angular.module('viewHistoryController', []).controller('viewHistoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "View history";
    $scope.resource = "savicspharmacy";
    $scope.item_uuid = $stateParams.uuid;
    var dictionary = require("../utils/dictionary");

    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Viewhistory": "View history" };

    var vm = this;
    vm.appTitle = "View history";

    $scope.transactions = [];
    openmrsRest.get($scope.resource + "/item/" + $scope.item_uuid).then(function (response) {
        if (response && response.uuid) {
            $scope.item = response;

            openmrsRest.get($scope.resource + "/transaction?item=" + $scope.item.id).then(function (response) {
                if (response.results.length >= 1) {
                    $scope.transactions = response.results;
                }
            })
        }
    })

    $scope.openViewTransaction = function (data) {
        $state.go('home.viewtransaction', {
            uuid: data.uuid
        });
    };

    $scope.getTransactionType = function (id) {
        return dictionary.getTransactionTypeById(id, "en");
    };

    $scope.query = {
        limit: 10,
        page: 1
    };



}]);
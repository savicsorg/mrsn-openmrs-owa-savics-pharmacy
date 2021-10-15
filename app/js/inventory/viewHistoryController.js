angular.module('viewHistoryController', []).controller('viewHistoryController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$location', '$translate', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $location, $translate) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = $translate.instant("View history");
    $scope.resource = "savicspharmacy";
    $scope.item_uuid = $stateParams.uuid;
    var dictionary = require("../utils/dictionary");
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Viewhistory": "View history" };

    var vm = this;
    vm.appTitle = $translate.instant("View history");

    $scope.transactions = [];
    openmrsRest.get($scope.resource + "/item/" + $scope.item_uuid).then(function (response) {
        if (response && response.uuid) {
            $scope.item = response;
            openmrsRest.get($scope.resource + "/transaction?item=" + $scope.item.id).then(function (response) {
                if (response.results.length >= 1) {
                    if ($stateParams.item_Batch) {
                        $scope.transactions = response.results.filter((result) => {
                            return result.itemBatch === $stateParams.item_Batch;
                        });
                    } else {
                        $scope.transactions = response.results;
                    }
                }
            })
        }
    })

    $scope.openViewTransaction = function (history) {
        $state.go('home.viewtransaction', {
            uuid: history.uuid,
            item_id: history.item.id,
            item_Batch: history.itemBatch,
            itemuuid: history.item.uuid,
        });
    };

    $scope.getTransactionType = function (id) {
        return dictionary.getTransactionTypeById(id, "en");
    };

    $scope.query = {
        limit: 5,
        page: 1
    };

    $scope.returnToPrevious = function () {
        const params = getParameters('/viewhistorybatch/:item_id/:uuid/:item_Batch', $location.path());
        if (params.uuid && params.item_Batch && params.item_id) { //for parameters with three ids
            $state.go('home.viewdetail', { id: params.item_id });
        } else {
            $state.go('home.inventory', {});
        }
    }

    const getParameters = (temp, path) => {
        const parameters = {};
        const tempParts = temp.split('/');
        const pathParts = path.split('/');
        for (let i = 0; i < tempParts.length; i++) {
            const element = tempParts[i];
            if (element.startsWith(':')) {
                const key = element.substring(1, element.length);
                parameters[key] = pathParts[i];
            }
        }
        return parameters;
    };


}]);
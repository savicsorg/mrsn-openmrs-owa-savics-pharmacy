angular.module('DispensingManagementController', []).controller('DispensingManagementController', ['$scope', '$rootScope', 'openmrsRest', function ($scope, $rootScope, openmrsRest) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Drugs dispensing management";
        $scope.resource = "savicspharmcy/dispense";
        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "Dispense": "dispense"};

        $scope.dispenses = [];

        $scope.query = {
            limit: 5,
            page: 1
        };

        $scope.logPagination = function (page, limit) {

        };

    }]);
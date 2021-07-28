angular.module('viewDetailController', []).controller('viewDetailController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "View detail";
    $scope.resource = "savicspharmacy";
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Viewdetail": "View detail" };

    var vm = this;
    vm.appTitle = "View detail";

    var type = "";
    var msg = "";
    
    $scope.getItemsLines = function () {
        $scope.viewOnStock = [];
        openmrsRest.getFull($scope.resource + "/item").then(function (response) {
            if (response.results.length >= 1) {
                $scope.viewOnStock = response.results;
                console.log($scope.viewOnStock)
            }
        })
    }
    $scope.getItemsLines();

    $scope.batches = [
        { bath: "5775874", date: "2010-07-31", unit: "box", qty: 45 },
        { bath: "5775874", date: "2010-07-31", unit: "box", qty: 45 },
        { bath: "5775874", date: "2010-07-31", unit: "box", qty: 45 }
    ];

    $scope.addBatch = function () {
        console.log("go to add new")
        $state.go('home.addbatch');
    }

    $scope.editBatch = function (data) {
        console.log("go to edit")
        $state.go('home.editbatch', {
            code: data.code,
        });
    }
    $scope.item = $stateParams.item;

    function handleResponse(response, e = null) {
        document.getElementById("loading_submit").style.visibility = "hidden";
        if (e) {
            type = "error";
            msg = e.data.error.message;
            showToast(msg, type);
            return;
        }
        if (response.uuid) {
            type = "success";
            msg = $stateParams.uuid ? response.name + " is Well edited." : response.name + " is Well saved.";
        } else {
            type = "error";
            msg = "we can't save your data.";
        }
        showToast(msg, type);
    }

    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.drugs')
        }
        $mdToast.show(
            $mdToast.simple()
                .content(msg)
                .theme(type + "-toast")
                .position('top right')
                .hideDelay(3000))
            .then(function () {
                $log.log('Toast dismissed.');
            }).catch(function () {
                $log.log('Toast failed or was forced to close early by another toast.');
            });
    }


}]);

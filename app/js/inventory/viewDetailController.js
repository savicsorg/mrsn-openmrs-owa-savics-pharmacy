angular.module('viewDetailController', []).controller('viewDetailController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest) {
    $scope.rootscope = $rootScope;
    $scope.appTitle = "View detail";
    $scope.resource = "savicspharmacy";
    $scope.item = $stateParams.item;
    $scope.item_id = $stateParams.id;
    //Breadcrumbs properties
    $rootScope.links = { "Pharmacy management module": "", "Viewdetail": "View detail" };

    var vm = this;
    vm.appTitle = "View detail";

    var type = "";
    var msg = "";
    
    $scope.getItemsLines = function () {
        $scope.batches = [];
        openmrsRest.get($scope.resource + "/itemsLine?item="+$scope.item_id).then(function (response) {
            if (response.results.length >= 1) {
                $scope.batches = response.results;
                $scope.item = response.results[0].item;
            }
        })
    }
    $scope.getItemsLines();

    $scope.addBatch = function () {
        $state.go('home.addbatch');
    }

    $scope.editBatch = function (data) {
        $state.go('home.editbatch', {
            code: data.code,
        });
    }
    

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

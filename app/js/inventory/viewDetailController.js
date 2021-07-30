angular.module('viewDetailController', []).controller('viewDetailController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog) {
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
        openmrsRest.get($scope.resource + "/itemsLine?item=" + $scope.item_id).then(function (response) {
            if (response.results.length >= 1) {
                $scope.batches = response.results;
                $scope.item = response.results[0].item;
            }
        })
    }
    $scope.getItemsLines();

    $scope.showConfirm = function (ev, obj) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your data?')
            .textContent('If you choose `Yes` this record will be deleted and you will not be able to recover it')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.delete(obj);
        }, function () {
            $mdDialog.cancel();
        });
    };

    $scope.delete = function (item) {
        openmrsRest.remove($scope.resource + "/itemsLine?item=" + $scope.item_id, item, "Reason for deletion").then(function (response) {
            type = "success";
            msg = "Deleted";
            showToast(msg, type);
            $scope.getItemsLines();
        }).catch(function (e) {
            type = "error";
            msg = e.data.error.message;
            showToast(msg, type);
        });
    }

    $scope.addBatch = function () {
        $state.go('home.addbatch', {
            item_id: $scope.item_id,
            item: $scope.item
        });
    }

    $scope.editBatch = function (data) {
        $state.go('home.editbatch', {
            batch: data,
            item_id: $scope.item_id,
            item: $scope.item
        });
    }


    function showToast(msg, type) {
        if (type != "error") {
            $state.go('home.viewdetail');
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

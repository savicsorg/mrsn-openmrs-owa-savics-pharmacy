angular.module('DispensingManagementController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('DispensingManagementController', ['$scope', '$rootScope', 'openmrsRest', '$mdDialog', '$mdToast', '$log', '$state', '$stateParams', function ($scope, $rootScope, openmrsRest, $mdDialog, $mdToast, $log, $state , $stateParams) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Drugs dispensing management";
        $scope.resource = "savicspharmacy";
        //Breadcrumbs properties
        $rootScope.links = {"Pharmacy management module": "", "Dispense": "dispense"};

        $scope.dispenses = [];


        $scope.options = {
            autoSelect: true,
            boundaryLinks: false,
            largeEditDialog: true,
            pageSelector: true,
            rowSelection: true
        };

        $scope.query = {
            limit: 10,
            page: 1
        };


        $scope.logPagination = function (page, limit) {

        };

        $scope.getAllSendings = function () {
            openmrsRest.get($scope.resource + "/sending").then(function (response) {
                if (response.results.length >= 1) {
                    $scope.dispenses = response.results;
                    console.log($scope.dispenses);
                }
            })
        }

        $scope.getAllSendings();

        $scope.delete = function (item) {
            openmrsRest.remove($scope.resource + "/sending", item, "Reason for deletion").then(function (response) {
                var type = "success";
                var msg = "Deleted";
                showToast(msg, type);
                $scope.getAllSendings();
            }).catch(function (e) {
                var type = "error";
                var msg = e.data.error.message;
                showToast(msg, type);
            });
        }


        
    $scope.openEdit = function (data) {
        $state.go('home.dispense', {
                uuid: data.uuid
            });
    }



        $scope.showConfirm = function (ev, obj) {
            var confirm = $mdDialog.confirm()
                    .title('Would you like to delete this dispensiation?')
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



        function showToast(msg, type) {
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

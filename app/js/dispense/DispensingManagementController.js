angular.module('DispensingManagementController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('DispensingManagementController', ['$scope', '$rootScope', 'openmrsRest', '$mdDialog', '$mdToast', '$log', '$state', '$stateParams', '$translate', function ($scope, $rootScope, openmrsRest, $mdDialog, $mdToast, $log, $state , $stateParams, $translate) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = $translate.instant("Drugs dispensing management");
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
                }else{
                    $scope.dispenses = [];
                }
            })
        }

        $scope.getAllSendings();

        $scope.delete = function (item) {
            openmrsRest.remove($scope.resource + "/sending", item, "Reason for deletion").then(function (response) {
                var type = "success";
                var msg = "Deleted";
                $scope.getAllSendings();
                showToast(msg, type);
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
                    .title($translate.instant('Would you like to delete this dispensiation?'))
                    .textContent($translate.instant('If you choose `Yes` this record will be deleted and you will not be able to recover it'))
                    .ariaLabel($translate.instant('Lucky day'))
                    .targetEvent(ev)
                    .ok($translate.instant('Yes'))
                    .cancel($translate.instant('Cancel'));
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
                        $log.log($translate.instant('Toast dismissed.'));
                    }).catch(function () {
                $log.log($translate.instant('Toast failed or was forced to close early by another toast.'));
            });
        }

        $scope.search = function(item) {
            if (!$scope.searchAll || (item.id.toString().indexOf($scope.searchAll) != -1) || (item.customer && item.customer.name.toLowerCase().indexOf($scope.searchAll) != -1) || (item.person && item.person.display.toLowerCase().indexOf($scope.searchAll.toLowerCase()) != -1) ){
                return true;
            }
            return false;
        };
    }]);

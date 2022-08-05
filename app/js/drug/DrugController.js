angular.module('DrugController', ['ngMaterial', 'ngAnimate', 'toastr', 'md.data.table']).controller('DrugController', ['$scope', '$state', '$stateParams', '$rootScope', '$mdToast', 'openmrsRest', '$mdDialog', '$translate', 'toastr', function ($scope, $state, $stateParams, $rootScope, $mdToast, openmrsRest, $mdDialog, $translate, toastr) {
        $scope.rootscope = $rootScope;
        $scope.appTitle = "Gestion des drugs";
        $scope.resource = "savicspharmacy";
        $rootScope.links = {"Pharmacy management module": "", "Drugs": "drugs", "Edit": "drug"};
        $scope.loading = false;
        $scope.drug = {soh: 0, virtualstock: 0, unit: {}, route: {}};
        $scope.item = null;
        $scope.searchText = "";

        $scope.getData = function () {
            $scope.loading = true;
            openmrsRest.getFull($scope.resource + "/route").then(function (response) {
                $scope.routes = response.results;
                openmrsRest.getFull($scope.resource + "/unit").then(function (response) {
                    $scope.units = response.results;
                    if ($stateParams.uuid) {
                        openmrsRest.getFull($scope.resource + "/item/" + $stateParams.uuid).then(function (response) {
                            $scope.loading = false;
                            $scope.drug = response;
                            $scope.searchText = $scope.drug.name;
                        }, function (e) {
                            $scope.loading = false;
                            toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                        });
                    } else
                        $scope.loading = false;
                }, function (e) {
                    $scope.loading = false;
                    toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                });
            }, function (e) {
                $scope.loading = false;
                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
            });
        }

        $scope.saveDrug = function () {
            $scope.loading = true;
            var query = JSON.parse(JSON.stringify($scope.drug));
            query.unit = query.unit.id;
            query.route = query.route.id;
            openmrsRest.getFull($scope.resource + "/item?code=" + $scope.drug.code).then(function (response) {
                if (response.results.length == 0 || (response.results[0].uuid == $scope.drug.uuid)) {
                    if ($scope.drug && $scope.drug.code && $scope.drug.code.length >= 3 && $scope.drug.code.length <= 120 && $scope.drug.name && $scope.drug.name != "") {
                        if ($scope.drug.uuid) {    //Edit
                            openmrsRest.update($scope.resource + "/item", query).then(function (response) {
                                $scope.drug = response;
                                $scope.getData();
                                $state.go('home.drugs', {});
                            }, function (e) {
                                $scope.loading = false;
                                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                            });
                        } else {    //Creation
                            openmrsRest.create($scope.resource + "/item", query).then(function (response) {
                                $scope.drug = response;
                                $scope.getData();
                                $state.go('home.drugs', {});
                            }, function (e) {
                                $scope.loading = false;
                                console.log(e)
                                toastr.error($translate.instant('An unexpected error has occured.'), $translate.instant('Error'));
                            });
                        }
                    } else {
                        $scope.loading = false;
                        if (!$scope.drug.code || !$scope.drug.name || !$scope.drug.route.id || !$scope.drug.unit.id || !$scope.drug.buyPrice || !$scope.drug.sellPrice || !$scope.drug.stockMin || !$scope.drug.stockMax) {
                            toastr.error($translate.instant('You must fill in the required fields before you proceed.'), $translate.instant('Error'));
                        }
                        if ($scope.drug.code && ($scope.drug.code.length <= 3 || $scope.drug.code.length > 120)) {
                            toastr.error($translate.instant('The product code must be between 3 and 120 characters max.'), $translate.instant('Error'));
                        } else if ($scope.drug.name && $scope.drug.name == "") {
                            toastr.error($translate.instant('The product name must not be empty.'), $translate.instant('Error'));
                        }
                    }
                } else {
                    $mdDialog.show($mdDialog.alert()
                            .parent(angular.element(document.querySelector('body')))
                            .clickOutsideToClose(true)
                            .textContent($translate.instant('Attention, the drug code you entered is already used. Please use another one.'))
                            .ok('Ok')).then(function () {
                        $scope.getData();
                        $scope.loading = false;
                    });
                }
            });
        }

        $scope.getMatches = function (searchText) {
            return openmrsRest.getFull("drug?q=" + searchText).then(function (response) {
                return response.results;
            });
        };

        $scope.selectedItemChange = function (item) {
            if (item) {
                $scope.drug.name = item.name;
                $scope.drug.drug = item.uuid;
            }
        }

        $scope.getData();

    }]);
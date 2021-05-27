angular.module('routes', []).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.when('', '/');
    $stateProvider.state('home', {
        abstract: true,
        url: '/',
        views: {
            'header': {
                template: require('./templates/header.html')
            },
            'content': {
                template: require('./templates/home.html')
            },
            'footer': {
                template: require('./templates/footer.html')
            }
        }
    }).state('home.dashboard', {// Define home page
        abstract: true,
        url: '',
        template: require('./dashboard/dashboard.html')
    }).state('home.dashboard.main', {// Define dashboard page
        url: '',
        template: require('./dashboard/main.html'),
        controller: 'DashboardController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./dashboard/DashboardController.js');
                    $ocLazyLoad.load({
                        name: 'DashboardController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home"]
    }).state('home.error', {
        url: 'error',
        template: '<div>Error 4000000004</div>',
    }).state('home.drugs', {
        url: 'drugs',
        template: require('./drug/drugs.html'),
        controller: 'DrugsController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./drug/DrugsController.js');
                    $ocLazyLoad.load({
                        name: 'DrugsController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Drugs"]
    }).state('home.drug', {
        url: 'drug',
        template: require('./drug/drug.html'),
        controller: 'DrugController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./drug/DrugController.js');
                    $ocLazyLoad.load({
                        name: 'DrugController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Drug", "New"]
    }).state('home.suppliers', {
        url: 'suppliers',
        template: require('./administration/suppliers.html'),
        controller: 'SuppliersController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/SuppliersController.js');
                    $ocLazyLoad.load({
                        name: 'SuppliersController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Suppliers"]
    }).state('home.supplier', {
        url: 'supplier',
        params: { code: undefined, name: undefined, address: undefined, email: undefined, tel: undefined, uuid: undefined },
        template: require('./administration/supplier.html'),
        controller: 'SupplierController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/SupplierController.js');
                    $ocLazyLoad.load({
                        name: 'SupplierController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Supplier", "New"]
    }).state('home.customers', {
        url: 'customers',
        template: require('./administration/customers.html'),
        controller: 'CustomersController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/CustomersController.js');
                    $ocLazyLoad.load({
                        name: 'CustomersController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Customers"]
    }).state('home.customer', {
        url: 'customer',
        template: require('./administration/customer.html'),
        controller: 'CustomerController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/CustomerController.js');
                    $ocLazyLoad.load({
                        name: 'CustomerController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Customer", "New"]
    }).state('home.types', {
        url: 'types',
        template: require('./administration/types.html'),
        controller: 'TypesController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/TypesController.js');
                    $ocLazyLoad.load({
                        name: 'TypesController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Types"]
    }).state('home.type', {
        url: 'type',
        template: require('./administration/type.html'),
        controller: 'TypeController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/TypeController.js');
                    $ocLazyLoad.load({
                        name: 'TypeController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Type", "New"]
    }).state('home.Locations', {
        url: 'locations',
        template: require('./administration/locations.html'),
        controller: 'LocationsController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/LocationsController.js');
                    $ocLazyLoad.load({
                        name: 'LocationsController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Locations"]
    }).state('home.location', {
        url: 'location',
        params: { code: undefined, name: undefined, uuid: undefined },
        template: require('./administration/location.html'),
        controller: 'LocationController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/LocationController.js');
                    $ocLazyLoad.load({
                        name: 'LocationController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Location", "New"]
    }).state('home.units', {
        url: 'units',
        template: require('./administration/units.html'),
        controller: 'UnitsController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/UnitsController.js');
                    $ocLazyLoad.load({
                        name: 'UnitsController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Units"]
    }).state('home.unit', {
        url: 'unit',
        params: { code: undefined, name: undefined, uuid: undefined },
        template: require('./administration/unit.html'),
        controller: 'UnitController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/UnitController.js');
                    $ocLazyLoad.load({
                        name: 'UnitController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Unit", "New"]
    }).state('home.routes', {
        url: 'routes',
        template: require('./administration/routes.html'),
        controller: 'RoutesController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/RoutesController.js');
                    $ocLazyLoad.load({
                        name: 'RoutesController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Routes"]
    }).state('home.route', {
        url: 'route',
        params: { code: undefined, name: undefined, uuid: undefined },
        template: require('./administration/route.html'),
        controller: 'RouteController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/RouteController.js');
                    $ocLazyLoad.load({
                        name: 'RouteController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Route", "New"]
    }).state('home.dispense', {
        url: 'dispense',
        template: require('./dispense/dispense.html'),
        controller: 'DispenseController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./dispense/DispenseController.js');
                    $ocLazyLoad.load({
                        name: 'DispenseController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "dispense", "New"]
    }).state('home.purchase', {
        url: 'purchase',
        template: require('./purchase/purchase.html'),
        controller: 'PurchaseController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./purchase/PurchaseController.js');
                    $ocLazyLoad.load({
                        name: 'PurchaseController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "purchase", "New"]
    }).state('home.receive', {
        url: 'receive',
        template: require('./purchase/receive.html'),
        controller: 'ReceiveController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./purchase/ReceiveController.js');
                    $ocLazyLoad.load({
                        name: 'ReceiveController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "receive", "New"]
    }).state('home.administration', {
        url: 'administration',
        template: require('./administration/main.html'),
        breadcrumbs: ["Home", "administration", "New"]
    })
    //$urlRouterProvider.otherwise('/error');
    //$locationProvider.html5Mode(true);
}]).run(['$rootScope', '$state', '$transitions', function ($rootScope, $state, $transitions) {
    $rootScope.kernel = {

    }
    //$state.go('home.dashboard.main');
    console.log($state);
    $transitions.onStart({}, function (trans) {

        var nextState = trans.to();

        $rootScope.kernel.isMain = true;
        $rootScope.kernel.version = "1.0.0";
        $rootScope.kernel.released = "00/00/0000";
        $rootScope.state = nextState.name;
        console.log(nextState);

        // Build the breadcrumb
        if (nextState.breadcrumbs) {
            $rootScope.kernel.isMain = false;
            $rootScope.kernel.breadcrumbs = [];
            var i;
            for (i = 0; i < nextState.breadcrumbs.length; i++) {
                $rootScope.kernel.breadcrumbs.push(nextState.breadcrumbs[i]);
            }
        }

        // Go to a state
        $rootScope.href = function (state) {
            $state.go(state);
        }
    });
}]);

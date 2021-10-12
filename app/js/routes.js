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
        params: {
            code: undefined,
            name: undefined,
            uuid: undefined,
            description: undefined,
            route: undefined,
            unit: undefined,
            sellPrice: undefined,
            buyPrice: undefined,
            soh: undefined,
            virtualstock: undefined,
            stockMax: undefined,
            stockMin: undefined
        },
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
    }).state('home.drugview', {
        url: 'drugview',
        template: require('./drug/drugview.html'),
        params: {
            code: undefined,
            name: undefined,
            uuid: undefined,
            description: undefined,
            route: undefined,
            unit: undefined,
            sellPrice: undefined,
            buyPrice: undefined,
            soh: undefined,
            virtualstock: undefined,
            stockMax: undefined,
            stockMin: undefined
        },
        controller: 'DrugViewController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./drug/DrugViewController.js');
                    $ocLazyLoad.load({
                        name: 'DrugViewController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Drug", "View"]
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
        params: { code: undefined, name: undefined, address: undefined, email: undefined, tel: undefined, customer_type_id: undefined, uuid: undefined },
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
    }).state('home.customertype', {
        url: 'customertype',
        params: { name: undefined, uuid: undefined },
        template: require('./administration/customertype.html'),
        controller: 'CustomertypeController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/CustomertypeController.js');
                    $ocLazyLoad.load({
                        name: 'CustomertypeController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Customertype", "New"]
    }).state('home.locations', {
        url: 'locations',
        template: require('./administration/locations.html'),
        controller: 'LocationsController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./administration/locationsController.js');
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
                    var mod = require('./administration/locationController.js');
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
                    var mod = require('./administration/unitsController.js');
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
                    var mod = require('./administration/unitController.js');
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
                    var mod = require('./administration/routesController.js');
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
                    var mod = require('./administration/routeController.js');
                    $ocLazyLoad.load({
                        name: 'RouteController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Route", "New"]
    }).state('home.dispensemain', {
        url: 'dispenses',
        template: require('./dispense/dispensingManagement.html'),
        controller: 'DispensingManagementController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./dispense/DispensingManagementController.js');
                    $ocLazyLoad.load({
                        name: 'DispensingManagementController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Dispense", "Dispensing management"]
    }).state('home.dispense', {
        url: 'dispense/:uuid',
        params: { sending: null },
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
        breadcrumbs: ["Home", "dispense", "Edit"]
    }).state('home.dispenses', {
        url: 'dispenses',
        params: { sending: null },
        template: require('./dispense/dispenses.html'),
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
    }).state('home.reception', {
        url: 'reception/:uuid',
        params: { reception: null, order: null },
        template: require('./inventory/reception.html'),
        controller: 'ReceptionController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/ReceptionController.js');
                    $ocLazyLoad.load({
                        name: 'ReceptionController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "receive", "New"]
    }).state('home.receptions', {
        url: 'receptions',
        params: { receptions: null },
        template: require('./inventory/receptions.html'),
        controller: 'ReceptionController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/ReceptionController.js');
                    $ocLazyLoad.load({
                        name: 'ReceptionController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "receive", "New"]
    }).state('home.viewdetail', {
        url: 'viewdetail/:id',
        params: {
            item: undefined,
            id: undefined
        },
        template: require('./inventory/viewDetail.html'),
        controller: 'viewDetailController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/viewDetailController.js');
                    $ocLazyLoad.load({
                        name: 'viewDetailController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "viewdetail"]
    }).state('home.adjustment', {
        url: 'adjustment/:id',
        params: { adjustment: null },
        template: require('./inventory/adjustment.html'),
        controller: 'AdjustmentController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/AdjustmentController.js');
                    $ocLazyLoad.load({
                        name: 'AdjustmentController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "inventory", "adjustment"]
    }).state('home.adjustmentbatch', {
        url: 'adjustment/:item_id/:batch_id',
        params: {
            id: null,
            item_id: null,
            batch_id: null,
            adjustment_for: null
        },
        template: require('./inventory/adjustment.html'),
        controller: 'AdjustmentController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/AdjustmentController.js');
                    $ocLazyLoad.load({
                        name: 'AdjustmentController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "inventory", "adjustment"]
    }).state('home.addbatch', {
        url: 'addbatch',
        params: {
            item_id: undefined,
            item: undefined
        },
        template: require('./inventory/addNewbatch.html'),
        controller: 'AddNewbatchController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/AddNewbatchController.js');
                    $ocLazyLoad.load({
                        name: 'AddNewbatchController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "inventory", "addbatch"]
    }).state('home.viewhistory', {
        url: 'viewhistory/:uuid',
        template: require('./inventory/viewHistory.html'),
        controller: 'viewHistoryController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/viewHistoryController.js');
                    $ocLazyLoad.load({
                        name: 'viewHistoryController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "viewhistory"]
    }).state('home.viewhistorybatch', {
        url: 'viewhistory/:item_id/:uuid/:item_Batch',
        template: require('./inventory/viewHistory.html'),
        controller: 'viewHistoryController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/viewHistoryController.js');
                    $ocLazyLoad.load({
                        name: 'viewHistoryController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "viewhistory"]
    }).state('home.inventory', {
        url: 'inventory',
        template: require('./inventory/viewOnStock.html'),
        controller: 'InventoryController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/inventoryController.js');
                    $ocLazyLoad.load({
                        name: 'InventoryController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "viewhistory"]
    }).state('home.stockatrisk', {
        url: 'stockatrisk',
        template: require('./inventory/stockatrisk/stockatrisk.html'),
        controller: 'StockAtRiskController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/stockatrisk/StockAtRiskController.js');
                    $ocLazyLoad.load({
                        name: 'StockAtRiskController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "inventory", "stockatrisk"]
    }).state('home.viewtransaction', {
        url: 'viewtransaction/:uuid',
        template: require('./inventory/Transactionview.html'),
        params: {
            unit: undefined
        },
        controller: 'TransactionViewController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./inventory/TransactionViewController.js');
                    $ocLazyLoad.load({
                        name: 'TransactionViewController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Drug", "View"]
    }).state('home.orders', { // to check with Kabir
        url: 'orders',
        template: require('./order/orders.html'),
        controller: 'OrderController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./order/OrderController.js');
                    $ocLazyLoad.load({
                        name: 'OrderController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home"]
    }).state('home.order', {
        url: 'order',
        params: { order: null },
        template: require('./administration/supplier.html'),
        template: require('./order/order.html'),
        controller: 'OrderController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./order/OrderController.js');
                    $ocLazyLoad.load({
                        name: 'OrderController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home"]


    }).state('home.orderview', {
        url: 'orderview',
        template: require('./order/orderview.html'),
        params: {
            id: undefined,
            supplier: undefined,
            name: undefined
        },
        controller: 'OrderViewController',
        resolve: {
            loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                require.ensure([], function () {
                    var mod = require('./order/OrderViewController.js');
                    $ocLazyLoad.load({
                        name: 'OrderViewController'
                    });
                    deferred.resolve(mod.controller);
                });
                return deferred.promise;
            }]
        },
        breadcrumbs: ["Home", "Order", "View"]
    }).state('home.administration', {
        url: 'administration',
        template: require('./administration/main.html'),
        breadcrumbs: ["Home", "administration", "New"]
    })
    //$urlRouterProvider.otherwise('/error');
    //$locationProvider.html5Mode(true);
}]).run(['$rootScope', '$state', '$transitions', 'openmrsTranslate', function ($rootScope, $state, $transitions, openmrsTranslate) {
    $rootScope.kernel = {

    }

    //CHange language function
    $rootScope.changeLanguage = function (langKey) {
        return openmrsTranslate.changeLanguage(langKey);
    };

    $rootScope.changeLanguage('fr');

    //$state.go('home.dashboard.main');
    $transitions.onStart({}, function (trans) {

        var nextState = trans.to();

        $rootScope.kernel.isMain = true;
        $rootScope.kernel.version = "1.0.0";
        $rootScope.kernel.released = "00/00/0000";
        $rootScope.state = nextState.name;

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

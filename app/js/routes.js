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
            }
        }).state('home.error', {
            url: 'error',
            template: '<div>Error 404</div>',
        }).state('home.equipements', {
            url: 'equipements',
            template: require('./equipement/equipement.html'),
            controller: 'EquipementsController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./equipement/EquipementsController.js');
                        $ocLazyLoad.load({
                            name: 'EquipementsController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Equipements"]
        }).state('home.equipements.edit', {
            url: 'equipements/:id',
            template: require('./equipement/equipement.html'),
            controller: 'EquipementsController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./equipement/EquipementsController.js');
                        $ocLazyLoad.load({
                            name: 'EquipementsController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Equipements", "Edit"]
        }).state('home.agents', {
            url: 'agents',
            template: require('./agent/agents.html'),
            controller: 'AgentsController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./agent/AgentsController.js');
                        $ocLazyLoad.load({
                            name: 'AgentsController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Agents"]
        }).state('home.agents.edit', {
            url: 'agents',
            template: require('./agent/agent.html'),
            controller: 'AgentsController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./agent/AgentsController.js');
                        $ocLazyLoad.load({
                            name: 'AgentsController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Agents", "Edit"]
        }).state('home.maintenances', {
            url: 'maintenances',
            template: require('./maintenance/maintenances.html'),
            controller: 'MaintenanceController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./maintenance/MaintenanceController.js');
                        $ocLazyLoad.load({
                            name: 'MaintenanceController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Maintenances"]
        }).state('home.maintenances.edit', {
            url: 'maintenance/:id',
            template: require('./maintenance/maintenance.html'),
            controller: 'MaintenanceController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./maintenance/MaintenanceController.js');
                        $ocLazyLoad.load({
                            name: 'MaintenanceController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Maintenances", "Edit"]
        }).state('home.maintenances.request', {
            url: 'maintenance/request',
            template: require('./maintenance/request.html'),
            controller: 'MaintenanceController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./maintenance/MaintenanceController.js');
                        $ocLazyLoad.load({
                            name: 'MaintenanceController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Maintenances", "Request"]
        }).state('home.maintenances.schedule', {
            url: 'maintenance/schedule',
            template: require('./maintenance/schedule.html'),
            controller: 'MaintenanceController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./maintenance/MaintenanceController.js');
                        $ocLazyLoad.load({
                            name: 'MaintenanceController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Maintenances", "Schedule"]
        }).state('home.operations', {
            url: 'operations',
            template: require('./operation/operations.html'),
            controller: 'OperationController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./operation/OperationController.js');
                        $ocLazyLoad.load({
                            name: 'OperationController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Operations"]
        }).state('home.operations.edit', {
            url: 'operation/:id',
            template: require('./operation/operation.html'),
            controller: 'OperationController',
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var mod = require('./operation/OperationController.js');
                        $ocLazyLoad.load({
                            name: 'OperationController'
                        });
                        deferred.resolve(mod.controller);
                    });
                    return deferred.promise;
                }]
            },
            breadcrumbs: ["Home", "Operations", "Edit"]
        });

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

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
            template: '<div>Error 4000000004</div>',
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

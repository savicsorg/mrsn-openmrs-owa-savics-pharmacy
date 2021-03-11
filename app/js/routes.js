angular.module('routes', []).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/error/404');

    $stateProvider.state('installation', {
        abstract: true,
        url: '/installation',
        views: {
            'content': {
                templateUrl: 'templates/installation/installation.html',
            }
        },
        access: { requiredAuthentication: false }
    }).state('installation.first', {
        url: '',
        templateUrl: 'templates/installation/first.html',
        controller: 'InstallationController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/InstallationCtrl.js');
            }]
        }
    }).state('installation.laboratory', {
        url: '/laboratory',
        templateUrl: 'templates/installation/laboratory.html',
        controller: 'InstallationController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/InstallationCtrl.js');
            }]
        }
    }).state('installation.second', {
        url: '/second',
        templateUrl: 'templates/installation/second.html',
        controller: 'InstallationController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/InstallationCtrl.js');
            }]
        }
    }).state('installation.third', {
        url: '/third',
        templateUrl: 'templates/installation/third.html',
        controller: 'InstallationController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/InstallationCtrl.js');
            }]
        }
    }).state('installation.fourth', {
        url: '/fourth',
        templateUrl: 'templates/installation/fourth.html',
        controller: 'InstallationController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/InstallationCtrl.js');
            }]
        }
    }).state('sign', {
        url: '/sign',
        views: {
            'content': {
                templateUrl: 'templates/sign/sign.html'
            }
        },
        access: { requiredAuthentication: false }
    }).state('signin', {
        url: '/signin',
        params: { isNew: null, isResetted: null, isLost: null, email: null },
        views: {
            'content': {
                templateUrl: 'templates/sign/signin.html',
                controller: 'SigninController'
            }
        },
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/sign/SigninCtrl.js');
            }]
        }
    }).state('signup', {
        url: '/signup',
        views: {
            'content': {
                templateUrl: 'templates/sign/signup.html',
                controller: 'SignupController'
            }
        },
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/sign/SignupCtrl.js');
            }]
        }
    }).state('recovery', {
        abstract: true,
        url: '/recovery',
        views: {
            'content': {
                templateUrl: 'templates/recovery/recovery.html'
            }
        },
        access: { requiredAuthentication: false }
    }).state('recovery.lost', {
        url: '/lost',
        templateUrl: 'templates/recovery/lost.html',
        controller: 'LostController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/recovery/LostCtrl.js');
            }]
        }
    }).state('recovery.reset', {
        url: '/reset/:token',
        templateUrl: 'templates/recovery/reset.html',
        controller: 'ResetController',
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/recovery/ResetCtrl.js');
            }]
        }
    }).state('ephemeral', {
        url: '/ephemeral/:token',
        views: {
            'content': {
                templateUrl: 'templates/ephemeral.html',
                controller: 'EphemeralController'
            }
        },
        access: { requiredAuthentication: false },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/EphemeralCtrl.js');
            }]
        }
    }).state('home', {
        abstract: true,
        url: '/',
        views: {
            'header': {
                templateUrl: 'templates/menu/menu.html',
                controller: 'MenuController'
            },
            'content': {
                templateUrl: 'templates/home.html'
            }
        },
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/MenuCtrl.js');
            }]
        }
    }).state('home.dashboard', {// Define dashboard page (ABSTRACT)
        abstract: true,
        url: '',
        templateUrl: 'templates/dashboard/dashboard.html',
        access: { requiredAuthentication: true }
    }).state('home.dashboard.main', {// Define dashboard page
        url: '',
        templateUrl: 'templates/dashboard/main.html',
        controller: 'DashboardController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/DashboardCtrl.js');
            }]
        }
    }).state('home.analysis', {// Define Analysis page
        url: 'analysis',
        templateUrl: 'templates/analysis.html',
        controller: 'AnalysisController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/AnalysisCtrl.js');
            }]
        },
        noLoading: true
    }).state('home.users', {
        abstract: true,
        url: 'users',
        templateUrl: 'templates/users/users.html',
        access: { requiredAuthentication: true },
    }).state('home.users.main', {
        url: '',
        templateUrl: 'templates/users/main.html',
        controller: 'UsersController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/users/UsersCtrl.js');
            }]
        },
        breadcrumbs: ["Users"]
    }).state('home.users.edit', {
        url: '/edit/:id',
        templateUrl: 'templates/users/edit.html',
        controller: 'UserController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/users/UserCtrl.js');
            }]
        },
        breadcrumbs: ["Users", "Edit"]
    }).state('home.users.profile', {
        url: '/preview/:id',
        templateUrl: 'templates/users/profile.html',
        controller: 'UserController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/users/UserCtrl.js');
            }]
        },
        breadcrumbs: ["Users", "Preview"]
    }).state('home.users.new', {
        url: '/new',
        templateUrl: 'templates/users/edit.html',
        controller: 'UserController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/users/UserCtrl.js');
            }]
        },
        breadcrumbs: ["Users", "New"]
    }).state('home.devices', {
        abstract: true,
        url: 'devices',
        templateUrl: 'templates/devices/devices.html',
        access: { requiredAuthentication: true },
    }).state('home.devices.main', {
        url: '',
        templateUrl: 'templates/devices/main.html',
        controller: 'DevicesController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/devices/DevicesCtrl.js');
            }]
        },
        breadcrumbs: ["Devices"]
    }).state('home.devices.information', {
        url: '/preview/:id',
        templateUrl: 'templates/devices/information.html',
        controller: 'DeviceController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/devices/DeviceCtrl.js');
            }]
        },
        breadcrumbs: ["Devices", "Preview"]
    }).state('home.reports', {
        abstract: true,
        url: 'reports',
        templateUrl: 'templates/reports/reports.html',
        access: { requiredAuthentication: true }
    }).state('home.reports.main', {
        url: '',
        templateUrl: 'templates/reports/main.html',
        controller: 'ReportsController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/reports/ReportsCtrl.js');
            }]
        },
        breadcrumbs: ["Reports"]
    }).state('home.reports.new', {
        url: '/new',
        templateUrl: 'templates/reports/edit.html',
        controller: 'ReportController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/reports/ReportCtrl.js');
            }]
        },
        breadcrumbs: ["Reports", "New"]
    }).state('home.reports.edit', {
        url: '/edit/:id',
        templateUrl: 'templates/reports/edit.html',
        controller: 'ReportController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/reports/ReportCtrl.js');
            }]
        },
        breadcrumbs: ["Reports", "Edit"]
    }).state('home.thresholds', {
        url: 'thresholds',
        templateUrl: 'templates/thresholds.html',
        controller: 'ThresholdsController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/ThresholdsCtrl.js');
            }]
        },
        breadcrumbs: ["Thresholds"]
    }).state('home.systemstatus', {
        url: 'systemstatus',
        templateUrl: 'templates/systemstatus.html',
        controller: 'SystemStatusController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/SystemStatusCtrl.js');
            }]
        },
        breadcrumbs: ["System Status"]
    }).state('home.interventions', {
        url: 'systemstatus/:id/:computer',
        templateUrl: 'templates/interventions.html',
        controller: 'InterventionsController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/InterventionsCtrl.js');
            }]
        },
        breadcrumbs: ["System Status"]
    }).state('home.audit', {
        url: 'audit',
        templateUrl: 'templates/audit.html',
        controller: 'AuditController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/AuditCtrl.js');
            }]
        },
        breadcrumbs: ["Audit"]
    }).state('home.configuration', {
        url: 'configuration',
        templateUrl: 'templates/configuration.html',
        controller: 'ConfigurationController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/ConfigurationCtrl.js');
            }]
        },
        breadcrumbs: ["Configuration"]


    }).state('home.capture', {
        abstract: true,
        url: 'capture',
        controller: 'CaptureController',
        templateUrl: 'templates/capture.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/CaptureCtrl.js');
            }]
        }
    }).state('home.capture.patients', {
        abstract: true,
        url: '/patients',
        access: { requiredAuthentication: true }
    }).state('home.capture.patients.main', {
        url: '',
        controller: 'PatientsController',
        templateUrl: 'templates/data/patients/main.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/PatientsCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Patients"]
    }).state('home.capture.patients.edit', {
        url: '/edit/:id',
        controller: 'PatientController',
        templateUrl: 'templates/data/patients/edit.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/patients/PatientCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Patients", "Edit"]
    }).state('home.capture.patients.new', {
        url: '/new',
        params: { id: undefined },
        controller: 'PatientController',
        templateUrl: 'templates/data/patients/edit.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/patients/PatientCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Patients", "New"]
    }).state('home.capture.medicalrecords', {
        url: '/medicalrecords',
        params: { id: undefined, patientID: undefined },
        templateUrl: 'templates/data/medical_records.html',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Medical data", "Medical records"]
    }).state('home.capture.medicalrecords.newconsultation', {
        url: '/consultation/new',
        templateUrl: 'templates/data/medical_records/consultations/edit.html',
        controller: 'ConsultationController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/medical_records/consultations/ConsultationCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Consultations", "New"]
    }).state('home.capture.medicalrecords.editconsultation', {
        url: '/consultation/edit/:id',
        templateUrl: 'templates/data/medical_records/consultations/edit.html',
        controller: 'ConsultationController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/medical_records/consultations/ConsultationCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Consultations", "edit"]
    }).state('home.capture.tests', {
        abstract: true,
        url: '/tests',
        access: { requiredAuthentication: true }
    }).state('home.capture.tests.main', {
        url: '',
        templateUrl: 'templates/data/tests/main.html',
        controller: 'TestsController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/TestsCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Tests"]
        /*}).state('home.capture.tests.new', {
        url: '/new',
        templateUrl: 'templates/data/tests/edit.html',
        controller: 'TestController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/tests/TestCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Tests", "New"]*/
    }).state('home.capture.tests.edit', {
        url: '/edit/:id',
        templateUrl: 'templates/data/tests/edit.html',
        controller: 'TestController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/tests/TestCtrl.js');
            }]
        },
        breadcrumbs: ["Medical data", "Tests", "Edit"]
    }).state('home.logistics', {
        abstract: true,
        url: 'logistics',
        controller: 'LogisticsController',
        templateUrl: 'templates/logistics.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/LogisticsCtrl.js');
            }]
        },
    }).state('home.logistics.products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'templates/data/products.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/ProductsCtrl.js');
            }]
        },
        breadcrumbs: ["Inventory", "Products"]
    }).state('home.logistics.batches', {
        url: '/batches',
        templateUrl: 'templates/data/batches.html',
        controller: 'BatchesController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/BatchesCtrl.js');
            }]
        },
        breadcrumbs: ["Inventory", "Batches"]
    }).state('home.logistics.transfersDone', {
        url: '/transfers',
        templateUrl: 'templates/data/transfersDone.html',
        controller: 'TransfersDoneController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/TransfersDoneCtrl.js');
            }]
        },
        breadcrumbs: ["Inventory", "Transfers"]

    }).state('home.administration', {
        abstract: true,
        url: 'administration',
        controller: 'AdministrationController',
        templateUrl: 'templates/administration.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/AdministrationCtrl.js');
            }]
        }
    }).state('home.administration.contacts', {
        url: '/contacts',
        templateUrl: 'templates/data/contacts/main.html',
        controller: 'ContactsController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/ContactsCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Contacts"]
    }).state('home.administration.new', {
        url: '/contacts/new',
        controller: 'ContactController',
        templateUrl: 'templates/data/contacts/edit.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/contacts/ContactCtrl.js');
            }]
        },
        breadcrumbs: ["Contacts", "New"]

    }).state('home.administration.edit', {
        url: '/contacts/edit/:id',
        controller: 'ContactController',
        templateUrl: 'templates/data/contacts/edit.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/contacts/ContactCtrl.js');
            }]
        },
        breadcrumbs: ["Contacts", "Edit"]
    }).state('home.administration.laboratories', {
        url: '/laboratories',
        templateUrl: 'templates/data/laboratories.html',
        controller: 'LaboratoriesController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/LaboratoriesCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Laboratories"]
    }).state('home.administration.laboratory', {
        url: '/new',
        templateUrl: 'templates/data/laboratories/edit.html',
        controller: 'LaboratoryController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/laboratories/LaboratoryCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Laboratories", "New"]
    }).state('home.administration.laboratory.edit', {
        url: '/laboratory/edit/:id',
        controller: 'LaboratoryController',
        templateUrl: 'templates/data/laboratories/edit.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/laboratories/LaboratoryCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Laboratories", "Edit"]
    }).state('home.administration.import', {
        url: '/import',
        templateUrl: 'templates/data/import.html',
        controller: 'ImportController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/ImportCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Import"]
    }).state('home.administration.export', {
        url: '/export',
        templateUrl: 'templates/data/export.html',
        controller: 'ExportController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/ExportCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Export"]
    }).state('home.administration.duplicates', {
        url: '/duplicates',
        controller: 'DuplicatesController',
        templateUrl: 'templates/data/duplicates.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/data/DuplicatesCtrl.js');
            }]
        },
        breadcrumbs: ["Administration", "Duplicates"]
    }).state('home.releases', {
        url: 'releases',
        controller: 'ReleasesController',
        templateUrl: 'templates/releases.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/ReleasesCtrl.js');
            }]
        },
        breadcrumbs: ["Releases"]
    }).state('home.notifications', {
        url: 'notifications',
        templateUrl: 'templates/notifications.html',
        controller: 'NotificationsController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/NotificationsCtrl.js');
            }]
        }
    }).state('home.profile', {
        abstract: true,
        url: 'profile',
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/ProfileCtrl.js');
            }]
        }
    }).state('home.profile.main', {
        url: '',
        templateUrl: 'templates/profile/main.html',
        controller: 'ProfileController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Profile"]
    }).state('home.profile.name', {
        url: '/name',
        templateUrl: 'templates/profile/name.html',
        controller: 'ProfileController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Profile", "Name"]
    }).state('home.profile.email', {
        url: '/email',
        templateUrl: 'templates/profile/email.html',
        controller: 'ProfileController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Profile", "Email"]
    }).state('home.profile.phone', {
        url: '/phone',
        templateUrl: 'templates/profile/phone.html',
        controller: 'ProfileController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Profile", "Phone"]
    }).state('home.profile.address', {
        url: '/address',
        templateUrl: 'templates/profile/address.html',
        controller: 'ProfileController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Profile", "Address"]
    }).state('home.settings', {
        abstract: true,
        url: 'settings',
        templateUrl: 'templates/settings/settings.html',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/SettingsCtrl.js');
            }]
        }
    }).state('home.settings.main', {
        url: '',
        templateUrl: 'templates/settings/main.html',
        controller: 'SettingsController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Settings", "Edit"]
    }).state('home.settings.avatar', {
        url: '/avatar',
        templateUrl: 'templates/settings/avatar.html',
        controller: 'SettingsController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Settings", "Avatar"]
    }).state('home.settings.password', {
        url: '/password',
        templateUrl: 'templates/settings/password.html',
        controller: 'SettingsController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Settings", "Password"]
    }).state('home.settings.language', {
        url: '/language',
        templateUrl: 'templates/settings/language.html',
        controller: 'SettingsController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Settings", "Language"]
    }).state('home.settings.dashboard', {
        url: '/dashboard',
        templateUrl: 'templates/settings/dashboard.html',
        controller: 'SettingsController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Settings", "Dashboard"]

    }).state('home.settings.notifications', {
        url: '/notifications',
        templateUrl: 'templates/settings/notifications.html',
        controller: 'SettingsController',
        access: { requiredAuthentication: true },
        breadcrumbs: ["Settings", "Notifications"]
    }).state('home.error', {
        url: 'error/:status',
        templateUrl: 'templates/error.html',
        controller: 'ErrorController',
        access: { requiredAuthentication: true },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/ErrorCtrl.js');
            }]
        }
    }).state('home.about', {
        url: 'about',
        templateUrl: 'templates/about.html',
        access: { requiredAuthentication: true },
        noLoading: true
    });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('TokenInterceptor');
}]).run(['$rootScope', '$location', '$state', '$window', 'gettextCatalog', '$ocLazyLoad', '$injector', '$timeout', '$transitions', '$filter','$q','$http', 'PendingRequest', function ($rootScope, $location, $state, $window, gettextCatalog, $ocLazyLoad, $injector, $timeout, $transitions, $filter, $q, $http, PendingRequest) {
    $rootScope.kernel = {
        textoStatus: "notactive",
        texto: "notactive",
        textoBalance:""
    };

    $window.addEventListener("textoStopped", function () {
        $rootScope.$apply(function () {
            $rootScope.kernel.texto = "stopped";
            //$rootScope.kernel.textoBalance:"Texto is offline";
        });
    }, false);
    $window.addEventListener("textoStarted", function () {
        $rootScope.$apply(function () {
            $rootScope.kernel.texto = "started";
        });
    }, false);
    $window.addEventListener("textoError", function () {
        $rootScope.$apply(function () {
            $rootScope.kernel.texto = "error";
            //$rootScope.kernel.textoBalance:"Texto is offline";
        });
    }, false);
    $window.addEventListener("textoNoDevice", function () {
        $rootScope.$apply(function () {
            $rootScope.kernel.texto = "nodevice";
            //$rootScope.kernel.textoBalance:"Texto is offline";
        });
    }, false);
    var rangeCustomizedForCountry = false;

    $transitions.onStart({}, function (trans) {
        $rootScope.kernel.newLoading = true;

        // When route/state change, we need to cancel all requests
        PendingRequest.cancelAll();

        var nextState = trans.to();
        /*
        if (!nextState.noLoading) {
            $rootScope.kernel.loading = 0;
        }
        */
        //$rootScope.kernel.sharedLoadingList = [];
        if (!$rootScope.account) {
            $rootScope.account = {};
        }
        if ($window.localStorage.token && !$rootScope.path) {
            $rootScope.path = {
                buttons: [],
                theme: undefined,
                testType: undefined,
                diagnostic: undefined,
                charts: [],
                helper: []
            };
        }
        if (!$rootScope.kernel.alerts || $rootScope.kernel.alerts.length == 0) {
            $rootScope.kernel.alerts = [];
        }
        // Build date range
        if (!$rootScope.range) {
            var max = new Date();
            max.setDate(max.getDate() + 1);
            $rootScope.range = {
                min: new Date(1970, 0, 1),
                max: max,
                from: {
                    isOpen: false,
                    isDisabled: true,
                    value: new Date(new Date(new Date(new Date().setDate(new Date().getDate() - 30))).setHours(0, 0, 0, 0)),
                    handleShowCalendar: function($event) {
                        this.isOpen = true;
                        this.isDisabled = false;
                    },
                    handleBlur: function() {
                        this.isOpen = false;
                        this.isDisabled = true;
                    }
                },
                to: {
                    isOpen: false,
                    isDisabled: true,
                    value: new Date(new Date(new Date(new Date().setDate(new Date().getDate()))).setHours(23, 59, 59, 999)),
                    handleShowCalendar: function($event) {
                        this.isOpen = true;
                        this.isDisabled = false;
                    },
                    handleBlur: function() {
                        this.isOpen = false;
                        this.isDisabled = true;
                    }
                }
            };
        }

        $rootScope.kernel.isMain = true;
        $rootScope.kernel.version = "3.2.0";
        $rootScope.kernel.released = "15/02/2021";
        $rootScope.state = nextState.name;
        

        $ocLazyLoad.load('js/services/ConfigurationService.js').then(function () {
            var Configuration = $injector.get('Configuration');
            Configuration.culture().then(function (response) {
                $rootScope.kernel.namingOrder = response.data.namingOrder;
                $rootScope.kernel.country = response.data.country;
                if(rangeCustomizedForCountry === false && $rootScope.kernel.country === "BEL"){
                    $rootScope.range.from.value = new Date(new Date(2020,0,1).setHours(0, 0, 0, 0));
                    rangeCustomizedForCountry = true;
                }
                $rootScope.kernel.background = response.data.continent;
                $rootScope.kernel.title = 'DataToCare';
                $rootScope.kernel.environment = response.data.environment == "dev" ? "THIS IS NOT PRODUCTION":"";
                $rootScope.kernel.logo = {
                    large: '../img/logos/' + 'logo-full.png',
                    small: '../img/logos/' + 'logo.png'
                };
                // Personalize index.html
                $window.document.title = $rootScope.kernel.title;
                (function () {
                    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';
                    link.href = '../img/logos/' + 'favicon.ico';
                    document.getElementsByTagName('head')[0].appendChild(link);
                })();

                // Build account profile
                if ($window.localStorage.token && !$rootScope.account.email) {
                    $ocLazyLoad.load('js/services/AccountService.js').then(function () {
                        var Account = $injector.get('Account');
                        Account.read().then(function (response) {
                            var profile = response.data;
                            $window.localStorage.language = profile.language;
                            $rootScope.account.id = profile._id;
                            $rootScope.account.firstname = profile.firstname;
                            $rootScope.account.lastname = profile.lastname;
                            $rootScope.account.email = profile.email;
                            $rootScope.account.role = profile.role;
                            $rootScope.account.region = profile.regions;
                            if (profile.preferences !== undefined) {
                                if (profile.preferences.avatar !== undefined) {
                                    $rootScope.account.avatar = profile.preferences.avatar;
                                }
                                if (profile.preferences.dashboard !== undefined && profile.preferences.dashboard.cards !== undefined) {
                                    $rootScope.buildDashboard();
                                }
                            }

                            $ocLazyLoad.load('js/services/UIService.js').then(function () {
                                var UI = $injector.get('UI');
                                $ocLazyLoad.load('js/services/DictionaryService.js').then(function () {
                                    var Dictionary = $injector.get('Dictionary');
                                    $ocLazyLoad.load('js/services/LaboratoryService.js').then(function () {
                                        var Laboratory = $injector.get('Laboratory');

                                        UI.nav().then(function (response) {
                                            $rootScope.account.showTextoStatus = response.data.nav.top.texto;
                                            $rootScope.account.showDateRange = response.data.nav.top.dateRange;
                                            $rootScope.account.showPath = response.data.nav.top.path;
                                            $rootScope.account.showLabs = response.data.nav.top.labs;
                                            $rootScope.account.showProvinces = response.data.nav.top.province;
                                            $rootScope.account.showDistricts = response.data.nav.top.district;
                                            $rootScope.account.showAddButton = response.data.nav.bottom.addButton;

                                            //if (!$rootScope.provinces) {
                                            Dictionary.jsonList({
                                                dictionary: 'location',
                                                levels: ['countries', $rootScope.kernel.country]
                                            }).then(function (response) {
                                                var data = response.data;
                                                $rootScope.provinces =[];
                                                if($rootScope.account.role!=="3"){
                                                    $rootScope.provinces = data.jsonList;
                                                    for (i = 0; i < $rootScope.provinces.length; i++) {
                                                        $rootScope.provinces[i].name = $rootScope.provinces[i].value;
                                                    }
                                                }else{
                                                    prov = data.jsonList.filter(function(item, idx) {
                                                        item.name = item.value;
                                                        return $rootScope.account.region.includes(item.id);
                                                    });
                                                    $rootScope.provinces=prov;
                                                }
                                                $rootScope.provinces.unshift({
                                                    _id: -1,
                                                    name: gettextCatalog.getString("All provinces")
                                                });
                                                $rootScope.selectedProvince = $rootScope.provinces[0];
                                            }).catch(function (response) {
                                                console.error(response);
                                            });

                                            //}

                                            $rootScope.select = function (type) {
                                                $rootScope.selectedLaboratoriesTmp = [];
                                                
                                                switch (type) {
                                                    case 'province':
                                                        if ($rootScope.selectedProvince.id) {
                                                            Laboratory.getProvincesLabs({ state: $rootScope.selectedProvince.id }).then(function (response) {
                                                                var data = response.data;
                                                                if (data.length > 0) {
                                                                    for (i = 0; i < data.length; i++) {
                                                                        if (!$rootScope.selectedLaboratoriesTmp.includes(data[i].id)) {
                                                                            //filter for supervisor
                                                                            $rootScope.selectedLaboratoriesTmp.push(data[i].id);
                                                                        }
                                                                    }
                                                                } else {
                                                                    $rootScope.selectedLaboratoriesTmp.push(0);
                                                                }
                                                                $rootScope.selectedLaboratories = $rootScope.selectedLaboratoriesTmp;
                                                            }).catch(function (response) {
                                                                console.error(response);
                                                            });

                                                            // get all districts
                                                            if ($window.localStorage.token) {
                                                                Dictionary.jsonList({
                                                                    dictionary: 'location',
                                                                    levels: ['countries', $rootScope.kernel.country, $rootScope.selectedProvince.id]
                                                                }).then(function (response) {
                                                                    var data = response.data;
                                                                    $rootScope.districts = data.jsonList;
                                                                    $rootScope.districts.unshift({
                                                                        _id: -1,
                                                                        name: gettextCatalog.getString("All districts")
                                                                    });
                                                                    $rootScope.selectedDistrict = $rootScope.districts[0];
                                                                }).catch(function (response) {
                                                                    console.error(response);
                                                                });
                                                            }
                                                            $rootScope.account.showDistricts = true;
                                                        } else if ($rootScope.selectedProvince._id === -1) {
                                                            $rootScope.account.showDistricts = false;
                                                            $rootScope.districts = [];
                                                            $rootScope.districts.unshift({
                                                                _id: -1,
                                                                name: gettextCatalog.getString("All districts")
                                                            });
                                                            $rootScope.selectedDistrict = $rootScope.districts[0];
                                                            $rootScope.account.showLabs = false;
                                                            $rootScope.selectedLaboratoriesTmp.push(-1);
                                                            $rootScope.selectedLaboratories = $rootScope.selectedLaboratoriesTmp;
                                                            $rootScope.laboratories = [];
                                                            $rootScope.laboratories.unshift({
                                                                _id: -1,
                                                                name: gettextCatalog.getString("All laboratories")
                                                            });

                                                        }

                                                        break;
                                                    case 'district':
                                                        if ($rootScope.selectedDistrict.id) {
                                                            //if ($window.localStorage.token){
                                                            Laboratory.getDistrictsLabs({
                                                                state: $rootScope.selectedProvince.id,
                                                                city: $rootScope.selectedDistrict.id
                                                            }).then(function (response) {

                                                                var data = response.data;
                                                                // $scope.laboratories = data;
                                                                $rootScope.laboratories = [];
                                                                for (i = 0; i < data.length; i++) {
                                                                    $rootScope.laboratories.push(data[i]);
                                                                }
                                                                $rootScope.laboratories.unshift({
                                                                    _id: -1,
                                                                    name: gettextCatalog.getString("All laboratories")
                                                                });
                                                                $rootScope.selectedLaboratory = $rootScope.laboratories[0];
                                                                $rootScope.account.showLabs = true;
                                                                if (data.length > 0) {
                                                                    for (i = 0; i < data.length; i++) {
                                                                        if (!$rootScope.selectedLaboratoriesTmp.includes(data[i].id)) {
                                                                            $rootScope.selectedLaboratoriesTmp.push(data[i].id);
                                                                        }
                                                                    }
                                                                } else {
                                                                    if ($rootScope.selectedLaboratoriesTmp.length === 0)
                                                                        $rootScope.selectedLaboratoriesTmp.push(0);
                                                                }
                                                                $rootScope.selectedLaboratories = $rootScope.selectedLaboratoriesTmp;
                                                            }).catch(function (response) {
                                                                console.error(response);
                                                            });
                                                            // }
                                                        } else if ($rootScope.selectedDistrict._id === -1) {
                                                            $rootScope.account.showLabs = false;
                                                            $rootScope.laboratories = [];
                                                            $rootScope.laboratories.unshift({
                                                                _id: -1,
                                                                name: gettextCatalog.getString("All laboratories")
                                                            });
                                                            $rootScope.select('province');
                                                        }

                                                        break;
                                                    case 'lab':
                                                        if ($rootScope.selectedLaboratory.id) {
                                                            $rootScope.selectedLaboratoriesTmp.push($rootScope.selectedLaboratory.id);
                                                            $rootScope.selectedLaboratories = $rootScope.selectedLaboratoriesTmp;
                                                        } else if ($rootScope.selectedLaboratory._id === -1) {
                                                            $rootScope.select('district');
                                                        }
                                                        break;
                                                }
                                            };
                                        }).catch(function (response) {
                                            console.error(response);
                                        });
                                    });
                                });
                            });
                        }).catch(function (response) {
                            console.error(response);
                        });
                    });
                }
            }).catch(function (response) {
                console.error(response);
            });
        });

        // Build language
        gettextCatalog.currentLanguage = ($window.localStorage.language !== undefined) ? $window.localStorage.language.toLowerCase() : (navigator.language.substr(0, 2) || navigator.userLanguage.substr(0, 2));

        // Build the breadcrumb
        if (nextState.breadcrumbs) {
            $rootScope.kernel.isMain = false;
            $rootScope.kernel.breadcrumbs = [];
            for (i = 0; i < nextState.breadcrumbs.length; i++) {
                $rootScope.kernel.breadcrumbs.push(gettextCatalog.getString(nextState.breadcrumbs[i]));
            }
            gettextCatalog.getString('Preview')
        }

        // Redirtection
        if (nextState !== null && nextState.access !== null && nextState.access.requiredAuthentication && !$window.localStorage.token) {
            $location.path("/sign");
        }

        // Installation WIZARD
        if ($location.path().indexOf('installation') == -1) {
            $ocLazyLoad.load('js/services/InstallationService.js').then(function () {
                var Installation = $injector.get('Installation');
                Installation.status().then(function (response) {
                    if (response.data) {

                    } else {
                        $location.path("/installation");
                    }
                }).catch(function (response) {
                    console.error(response);
                    $location.path("/sign");
                });
            });
        }


        //--- Global functions -----------------
        $rootScope.selectLab = function (lab) {
            $rootScope.selectedLaboratory = lab;
        }
        $rootScope.buildDashboard = function () {
            $ocLazyLoad.load('js/services/UIService.js').then(function () {
                var UI = $injector.get('UI');
                UI.getDashboard().then(function (response) {
                    var cards = response.data.cards;
                    if (cards) {
                        $rootScope.cards = cards;
                    }
                    if(nextState.name === "home.dashboard.main"){
                        if ($rootScope.cards.length === 0) {
                            $rootScope.helperCards = {
                                title: gettextCatalog.getString("Ooh-la-la! Your dashboard is empty."),
                                html: gettextCatalog.getString("Please go to <a href='/analysis'>Analysis page</a> to enable some widgets (charts, maps, tables, etc.)."),
                                icon: "dashboard"
                            };
                            $rootScope.kernel.loading = 100;
                        } else {
                            $rootScope.helperCards = [];
                        }
                    }
                }).catch(function (response) {
                    console.error(response);
                });
            });
        };
        $rootScope.updateDashboard = function (selected, info) {
            $ocLazyLoad.load('js/services/UIService.js').then(function () {
                var UI = $injector.get('UI');
                UI.getDashboard().then(function (response) {
                    var cards = response.data.cards;
                    var updated = false;
                    if (cards) {
                        if (selected && !$rootScope.containsCard(info, cards)) {// in case of adding
                            cards.push(info);
                            updated = true;
                        } else if (!selected && $rootScope.containsCard(info, cards)) {
                            cards = cards.filter(function (e) {
                                return e.name !== info.name || e.disease !== info.disease || e.testType !== info.testType || e.diagnostic !== info.diagnostic;
                            });
                            updated = true;
                        }
                    } else {
                        if (selected) {
                            cards = [info];
                            updated = true;
                        }
                    }
                    if (updated) {
                        for (var j = 0; j < cards.length; j++) {
                            delete cards[j].priority;
                            delete cards[j].flex;
                            delete cards[j].pretty;
                        }
                        UI.updateDashboard({ cards: cards }).then(function (response) {
                            if ($state.is('home.dashboard.main')) {
                                $rootScope.buildDashboard();
                            }
                            if (selected) {
                                $rootScope.kernel.alerts.push({
                                    type: 3,
                                    msg: gettextCatalog.getString('Card added on your dashboard'),
                                    priority: 4
                                });
                            }
                            else {
                                $rootScope.kernel.alerts.push({
                                    type: 3,
                                    msg: gettextCatalog.getString('Card removed from your dashboard'),
                                    priority: 4
                                });
                            }
                            $rootScope.kernel.loading = 100;
                        }).catch(function (response) {
                            console.error(response);
                            $rootScope.kernel.loading = 100;
                            $rootScope.kernel.alerts.push({
                                type: 1,
                                msg: gettextCatalog.getString('An error occurred, please try again later'),
                                priority: 2
                            });
                        });
                    }
                }).catch(function (response) {
                    console.error(response);
                });
            });
        }
        $rootScope.containsCard = function (card, list) {
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].name == card.name && (!card.disease || (list[i].disease == card.disease && list[i].theme == card.theme && list[i].testType == card.testType && list[i].diagnostic == card.diagnostic))) {
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        };
        $rootScope.updateCardLoaded = function (card, loaded) {// TODO: To be removed once isLoading strategy is validated
            /*
            if(loaded === false){
               $rootScope.kernel.loading = 0;
            }
            if($rootScope.kernel.sharedLoadingList.includes(card)){// Remove it
               $rootScope.kernel.sharedLoadingList.splice($rootScope.kernel.sharedLoadingList.indexOf(card), 1);
            } else if(nextState.name === "home.dashboard.main" || nextState.name === "home.analysis"){// Add it
                // The if above is a Temporary fix while we are waiting for https://savics.atlassian.net/browse/DAT-263
                $rootScope.kernel.sharedLoadingList.push(card);
            }
            */
        };
        /*
        var watch = {};
        watch.cards = $rootScope.$watch('kernel.sharedLoadingList', function (newValue, oldValue) {
            if($rootScope.kernel.sharedLoadingList && oldValue !== newValue){
                console.log($rootScope.kernel.sharedLoadingList);
                if($rootScope.kernel.sharedLoadingList.length === 0){
                    $rootScope.kernel.loading = 100;
                }
            }
        }, true);
        $rootScope.$on('$destroy', function() {// in case of directive destroy, we destroy the watch
            watch.cards();
        });
        */
        // Set a focus on the specified input
        $rootScope.setFocus = function (name) {
            $timeout(function () {
                angular.element("input[name=" + name + "]").focus();
            }, 0);
        }
        // Go to a state
        $rootScope.href = function (state) {
            $state.go(state);
        }
        // Export a PNG version of the chart/map
        $rootScope.exportPNG = function (content, title) {
            $rootScope.kernel.loading = 0;
            var filename = 'DataToCare-server_' + title.replace(/ /g, '-');
            filename += '_' + $filter('ddMMyyyy')($rootScope.range.from.value) + '-' + $filter('ddMMyyyy')($rootScope.range.to.value);

            //Hidding unwanted items
            var toHide = document.getElementsByClassName("hide-before-export");
            for (var j = 0; j < toHide.length; j++) {
                toHide[j].style.display = 'none';
            }

            // converting HTML to canvas
            $ocLazyLoad.load('js/services/CanvasService.js').then(function () {
                var Canvas = $injector.get('Canvas');
                Canvas.getCanvas(content, function (canvas) {
                    //Canvas to png
                    var url_base64 = canvas.toDataURL('image/png').replace("data:image/png;base64,", "");

                    //dispaying back items that were hidden
                    for (var j = 0; j < toHide.length; j++) {
                        toHide[j].style.display = null;
                    }
                    //Saving the file
                    $ocLazyLoad.load('node_modules/angular-file-saver/dist/angular-file-saver.bundle.min.js').then(function () {
                        var data = atob(url_base64);
                        var asArray = new Uint8Array(data.length);
                        for (var i = 0, len = data.length; i < len; ++i) {
                            asArray[i] = data.charCodeAt(i);
                        }
                        var FileSaver = $injector.get('FileSaver');
                        var d = new Blob([asArray.buffer], { type: "data:image/png;base64" });
                        FileSaver.saveAs(d, filename + '.png');
                        $rootScope.kernel.loading = 100;
                    });
                });
            });
        }
        //--------------------------------------

        // Export an Excel version of the table/chart
        $rootScope.exportXLSX = function (content){
            $ocLazyLoad.load('node_modules/angular-file-saver/dist/angular-file-saver.bundle.min.js').then(function() {
                var FileSaver = $injector.get('FileSaver');
                $rootScope.kernel.loading = 0;
                var filename = 'DataToCare-server_' + content.title.replace(/ /g, '-');
                filename += '_' + $filter('ddMMyyyy')($rootScope.range.from.value) + '-' + $filter('ddMMyyyy')($rootScope.range.to.value);
                var deferred = $q.defer();
                function jsonBufferToObject (data, headersGetter, status) {
                    var type = headersGetter("Content-Type");
                    if (!type.startsWith("application/json")) {
                        return data;
                    };
                    var decoder = new TextDecoder("utf-8");
                    var domString = decoder.decode(data);
                    var json = JSON.parse(domString);
                    return json;
                };

                $ocLazyLoad.load('js/services/DownloadService.js').then(function () {
                    var Download = $injector.get('Download');
                    Download.start({
                        method: 'POST',
                        url:'/api/export/card',
                        data: content,
                        transformResponse: jsonBufferToObject
                    }).then(function(response){
                        var d = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                        FileSaver.saveAs(d, filename + '.xlsx');
                        $rootScope.kernel.loading = 100;
                        deferred.resolve(response.data);
                    }).catch(function(response) {
                        console.error(response);
                        if(response.data.error === '9500'){
                            $rootScope.kernel.alerts.push({
                                type: 1,
                                msg: gettextCatalog.getString('The Export is too big. Please reduce the date range'),
                                priority: 1
                            });
                            $rootScope.kernel.loading = 100;
                        }
                    });
                });
            });
        }
    });
}]);

/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

export default function appConfig($routeProvider, openmrsRest) {
    $routeProvider.
            when('/equipements', {
                template: require('./equipement/equipement.html'),
                controller: 'EquipementsController',
                controllerAs: 'vm'
            }).when('/agents', {
                template: require('./agent/agents.html'),
                controller: 'AgentsController',
                controllerAs: 'vm'
            }).otherwise({
                redirectTo: '/',
                template: require('./index/index.html'),
                controller: 'IndexController',
                controllerAs: 'vm'
            });
};


/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import angular from 'angular';
import ngRoute from 'angular-route';
import openmrsContribUiCommons from 'openmrs-contrib-uicommons';

import messagesEn from '../translation/messages_en.json';
import messagesEs from '../translation/messages_es.json';

import IndexController from './index/index.controller.js';
import EquipementsController from './equipement/equipements.controller.js';

import appConfig from './app.config.js';

export default angular.module('app',
        ['ngRoute',
            'openmrs-contrib-uicommons'])


        .controller('IndexController', IndexController)
        .controller('EquipementsController', EquipementsController)

        .config(['$routeProvider', appConfig])
        .config(['openmrsTranslateProvider', translateConfig])
        .config(['$qProvider', function ($qProvider) {$qProvider.errorOnUnhandledRejections(false);}])

function translateConfig(openmrsTranslateProvider) {
    openmrsTranslateProvider.addTranslations('en', messagesEn);
    openmrsTranslateProvider.addTranslations('es', messagesEs);
}
/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
angular.lowercase = text => (text || '').toLowerCase();

import openmrsContribUiCommons from 'openmrs-contrib-uicommons';
import routes from './routes.js';

import messagesEn from '../translation/messages_en.json';
import messagesEs from '../translation/messages_es.json';
import messagesFr from '../translation/messages_fr.json';

import AngularMaterialCSS from '../../node_modules/angular-material/angular-material.min.css';
import AngularMaterial from '../../node_modules/angular-material/angular-material.min.js';
import AngularMaterialdatatableCSS from '../../node_modules/angular-material-data-table/dist/md-data-table.min.css';
import AngularMaterialdatatableJS from '../../node_modules/angular-material-data-table/dist/md-data-table.min.js';
import style from '../css/main.css';
import fonts from '../css/fonts.css';

export default angular.module('app', [
    'ui.router',
    'openmrsRest',
    'routes',
    'ngMaterial',
    'ui.router',
    'ngSanitize',
    'gettext',
    'oc.lazyLoad',
    'angular-jwt',
    'openmrs-contrib-uicommons'
]).config(['openmrsTranslateProvider', translateConfig])
  .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

function translateConfig(openmrsTranslateProvider) {
    openmrsTranslateProvider.addTranslations('en', messagesEn);
    openmrsTranslateProvider.addTranslations('es', messagesEs);
    openmrsTranslateProvider.addTranslations('fr', messagesFr);
}
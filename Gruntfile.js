'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        i18nextract: {
            // Provide fr_FR language
            default_options: {
                src: [
                    'resources/languages/extraDictionary.html',
                    'app/js/*.js',
                    'app/js/*/*.js',
                    'app/js/*/*.html',
                    'app/js/*/*/*.js',
                    'app/js/*/*/*.html'
                ],
                suffix: '.json',
                lang: ['messages_fr'],
                dest: 'app/translation',
                jsonSrc: ['app/translations/*.json']
            }
        },
        angular_translate_extract: {
            default_options: {
                files: {
                    'app/translation/pot/template.pot': [
                        'app/js/*.js',
                        'app/js/*/*.js',
                        'app/js/*/*.html',
                        'app/js/*/*/*.js',
                        'app/js/*/*/*.html'
                    ]
                }
            }
        },
        nggettext_compile: {
            all: {
                files: {
                    'app/translation/appTranslations.js': ['app/translation/pot/*.po']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-angular-translate');
    grunt.loadNpmTasks('grunt-angular-translate-extract');
    grunt.loadNpmTasks('grunt-angular-gettext');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['i18nextract', 'angular_translate_extract', 'nggettext_compile']);

};
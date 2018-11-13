
(function () {

    'use strict';

    angular.module("sprinkle").config(config);

    config.$inject = ['$mdThemingProvider', '$translateProvider', '$urlRouterProvider', '$mdDateLocaleProvider'];

    function config($mdThemingProvider, $translateProvider, $urlRouterProvider, $mdDateLocaleProvider){

        //$httpProvider.interceptors.push('authInterceptor');

        //this loads up our routes dynamically from the previous object
        //for(var path in window.routes) {
        //    $urlRouterProvider.when(path, window.routes[path]);
        //}

        $translateProvider.useStaticFilesLoader({
            prefix: '/assets/locale/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage("sr");
        $translateProvider.directivePriority(0);

        // default strategy has to be specified
        // http://angular-translate.github.io/docs/#/guide/19_security
        $translateProvider.useSanitizeValueStrategy(null);
        // b/c of the warning in console

        $mdThemingProvider.theme('docs-light');
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('green')
            .accentPalette('deep-orange')
            .dark();

    }



}());
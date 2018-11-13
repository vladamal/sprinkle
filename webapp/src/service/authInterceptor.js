
(function(){

    'use strict';

    angular.module('sprinkle').factory( "authInterceptor", authInterceptor );

    authInterceptor.$inject = [ "$window" ];

    function authInterceptor( $window ){

        //var state;
        return {
            // Add authorization token to headers
            request: function(config) {
                config.headers = config.headers || {};
                if ($window.localStorage.getItem('token')) {
                    config.headers.authorization = 'JWT ' + $window.localStorage.getItem('token');
                }
                return config;
            }
        };

    }
}());


(function(){

    'use strict';

    angular.module('sprinkle').factory("restResourceService",restService);

    restService.$inject = ["$log","$resource", "mainConfig", "$window"];

    function restService($log, $resource, mainConfig, $window){

        return {
            resource: resource
        };

        /**
         *  Receives resource & calls server to get it
         * @param res the resource we are working with
         * @returns {*}
         *
         */
        function resource(res){
            return $resource(mainConfig.appBaseURL + res+'/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT',
                    headers: { Authorization: $window.localStorage.getItem('token')}
                },
                query: {
                    method: 'GET',
                    isArray: true,
                    headers: { Authorization: $window.localStorage.getItem('token')}
                },
                queryOne: {
                    method: 'GET',
                    headers: { Authorization: $window.localStorage.getItem('token')}
                },
                save: {
                    method: 'POST',
                    headers: { Authorization: $window.localStorage.getItem('token')}
                }
            });
        }
    }

}());
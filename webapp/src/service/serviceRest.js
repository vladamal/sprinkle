
(function(){

    'use strict';

    angular.module('sprinkle').factory("restService",restService);

    restService.$inject = [ "$log", '$q', '$http', 'mainConfig' ];

    function restService( $log, $q, $http, mainConfig ){

        var deferred = $q.defer();

        return { 
            getOne              : getOne,
            postServerRequest   : postServerRequest,
            putServerRequest    : putServerRequest,
            patchServerRequest  : patchServerRequest
        };

        function getOne(resource,id){
            var url = mainConfig.appBaseURL + resource+ "/" + encodeURIComponent(id);
            $log.debug(url);

            $http({
                method: 'GET',
                url: url,
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (status) {
                deferred.reject("restService: getOne : Error!");

            });

            return deferred.promise;
        }

        function postServerRequest(requestObject, endpoint) {
            var deferred = $q.defer();

            var url = mainConfig.appBaseURL + endpoint;
            $http({
                method: 'POST',
                url: url,
                data: requestObject
            })

                .then(function (data) {
                    deferred.resolve(data);
                }, function () {
                    deferred.reject("Request error.");

                });

            return deferred.promise;
        }

        function putServerRequest(requestObject, endpoint, id) {
            var deferred = $q.defer();

            var url = mainConfig.appBaseURL + endpoint +"/"+id;
            $http({
                method: 'PUT',
                url: url,
                data: requestObject
            })

                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject("Request error.");

                });

            return deferred.promise;
        }

        function patchServerRequest(id, resource) {
            var deferred = $q.defer();
            var url = mainConfig.appBaseURL + resource;

            $http({
                method: 'PATCH',
                url: url,
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                data: { id: id }
            }).then(
                function (res) {
                    deferred.resolve(res);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

    }

}());

(function(){

    'use strict';

    angular.module('sprinkle').factory( "planSortService", planSortService );

    planSortService.$inject = [ "restService" ];

    function planSortService( restService ){

        return {
            createSort : createSort
        };

        function createSort(sort) {
            return restService.postServerRequest(sort, 'sort');
        }

    }
}());
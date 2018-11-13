
(function(){

    'use strict';

    angular.module('sprinkle').factory( "planTypeService", planTypeService );

    planTypeService.$inject = [ "restResourceService", "restService" ];

    function planTypeService( restResourceService, restService ){

        return {
            getTypes        : getTypes,
            createType      : createType,
            getSortsByType  : getSortsByType
        };

        function getTypes() {
            return restResourceService.resource("type/s").query();
        }

        function createType(type) {
            return restService.postServerRequest(type, 'type');
        }

        function getSortsByType(id){
            return restResourceService.resource("type/" + id + "/sorts").queryOne();
        }

    }
}());
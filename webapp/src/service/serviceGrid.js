
(function(){

    'use strict';

    angular.module('sprinkle').factory( "gridService", gridService );

    gridService.$inject = [ "restResourceService", "$log", "restService" ];

    function gridService( restResourceService, $log, restService ){

        return {
            getGrids    : getGrids,
            createGrid  : createGrid,
            //insertPlants: insertPlants,
            getOne      : getOne
        };

        //function removePlants() {
        //    return restService.postServerRequest({},"plant/drop");
        //}
        //function insertPlants() {
        //    return restService.postServerRequest({},"plant/init");
        //}

        function getGrids() {
            return restResourceService.resource("grid/s").query();
        }

        function getOne(gridId) {
            return restResourceService.resource("grid/" + gridId).queryOne();
        }

        function createGrid(grid){
            return restService.postServerRequest(grid, 'grid');
        }

    }
}());
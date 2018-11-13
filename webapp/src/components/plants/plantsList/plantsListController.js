

(function() {

    'use strict';

    angular.module('sprinkle').controller("plantsListController", plantsListController);

    plantsListController.$inject = ['$scope', '$mdDialog', '$log', '$resource', 'plantService', '$mdBottomSheet'];

    function plantsListController($scope, $mdDialog, $log, $resource, plantService, $mdBottomSheet) {

        /* jshint validthis: true */
        var vmList = this;

        vmList.selectedPlants = plantService.selected;
        vmList.query = {
            order: 'id',
            limit: 50,
            paginationLimit: [5, 10, 50],
            page: 1
        };

        //vm.isOpen=false;
        //vm.hoverIn = function(){ this.hoverEdit = true; };
        //vm.hoverOut = function(){ this.hoverEdit = false; };
        vmList.openMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
            //vmList.data = vmList.getSelected(list);
        };


    }

})();
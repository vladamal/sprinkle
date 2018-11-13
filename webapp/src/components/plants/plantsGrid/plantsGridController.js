
(function() {

    'use strict';

    angular.module('sprinkle').controller("plantsGridController", plantsGridController);

    plantsGridController.$inject = ['$mdDialog', 'toastr', '$mdBottomSheet', 'plantService'];

    function plantsGridController($mdDialog, toastr, $mdBottomSheet, plantService) {

        /* jshint validthis: true */
        var vmGrid = this;

        vmGrid.isOpen=false;
        //vm.hoverIn = function(){ this.hoverEdit = true; };
        //vm.hoverOut = function(){ this.hoverEdit = false; };

        vmGrid.isOpenSub=false;

        vmGrid.gridsterOptions = {
            columns: 31,

            colWidth:'auto',
            rowWidth:'match',
            margins: [5, 5],

            draggable: {
                enabled: true,
                handle: '.box'
            },

            resizable: {
                enabled: true
            },

            floating: false,
            swapping: false,
            pushing:  false,

            minColumns: 1, // the minimum columns the grid must have
            maxColumns: 20,
            minRows: 2, // the minimum height of the grid, in rows
            maxRows: 100

        };





        //vmGrid.plants = plantService.getPlants();
        vmGrid.selectedDashboardId = '';

        //vm.newPlant = function() {
        //
        //    $mdBottomSheet.show({
        //        templateUrl: 'src/components/plants/plant/plantView.html',
        //        controller: 'plantController',
        //        locals: {
        //            buttonTitle : 'create'
        //        }
        //    }).then(function(clickedItem) {
        //        $scope.alert = clickedItem['name'] + ' clicked!';
        //    }).catch(function(error) {
        //        // User clicked outside or hit escape
        //    });
        //
        //
        //};


        //$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
        //    if (newVal !== oldVal) {
        //        $scope.dashboard = $scope.dashboards[newVal];
        //    } else {
        //        $scope.dashboard = $scope.dashboards[1];
        //    }
        //});

    }

})();


(function() {
    'use strict';

    angular.module('sprinkle').controller("addGridController", addGridController);

    addGridController.$inject = ['$mdDialog', 'userService', "gridService", '$log', 'toastr'];

    function addGridController($mdDialog, userService, gridService, $log, toastr) {

        /* jshint validthis: true */
        var vmAddGrid = this;

        init();

        function blankGrid () {
            vmAddGrid.grid = {
                gridName    : '',
                gridType    : null,
                gridWidth   : 1,
                userId      : ''
            };
        }

        function init(){
            blankGrid();
            userService.getUser().$promise.then(function(promise){
                vmAddGrid.grid.userId = promise.user._id;
            });
        }

        vmAddGrid.addGrid = function (parentScope) {
            gridService.createGrid(vmAddGrid.grid)
                .then(function(response){
                    if (response.data.success==false) {
                        toastr.error(response.data.message, 'Gre\u0161ka');
                    } else {
                        parentScope.grids.push(vmAddGrid.grid);
                        blankGrid();
                        toastr.success('nove ba\u0161te.', 'Uspe\u0161no dodavanje ');
                        //vmAddGrid.addGridForm.$setPristine();
                    }
                });
        };

    }
})();


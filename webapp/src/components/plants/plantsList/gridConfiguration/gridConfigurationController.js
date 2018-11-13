
(function() {

    'use strict';

    angular.module('sprinkle').controller("gridConfigurationController", gridConfigurationController);

    gridConfigurationController.$inject = ['planTypeService', '$mdSidenav', '$log'];

    function gridConfigurationController(planTypeService, $mdSidenav, $log) {

        /* jshint validthis: true */
        var vmGridConf = this;

        vmGridConf.plantType = {
            "name" : '',
            "sort" : ''
        };


        //vmPlantType.close = function() {
        //    $mdSidenav('right').close()
        //        .then(function () {
        //            $log.debug("close right is done");
        //        });
        //};

        vmGridConf.addType = function() {
            console.log(vmGridConf.plantType);
            return $mdSidenav('right').close()
                .then(function () {
                    return vmGridConf.plantType;
                });
        }


    }

})();
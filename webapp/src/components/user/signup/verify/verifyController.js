
(function() {

    'use strict';

    angular.module('sprinkle').controller("verifyController", verifyController);

    verifyController.$inject = ['$mdDialog'];

    function verifyController( $mdDialog) {

        /* jshint validthis: true */
        var vm = this;
        vm.code = '';

        vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.verify = function(code) {
            $mdDialog.hide(code);
        };

    }

})();
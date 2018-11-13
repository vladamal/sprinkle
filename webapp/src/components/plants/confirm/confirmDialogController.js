
(function() {

    'use strict';

    angular.module('sprinkle').controller("confirmDialogController", confirmDialogController);

    confirmDialogController.$inject = ['$mdDialog', 'locals'];

    function confirmDialogController($mdDialog, locals) {

        /* jshint validthis: true */
        var vmConfirm = this;

        vmConfirm.title = locals.title;

        vmConfirm.cancel = function() {
            $mdDialog.cancel();
        };

        vmConfirm.remove = function() {
            $mdDialog.hide();
        };

    }

})();
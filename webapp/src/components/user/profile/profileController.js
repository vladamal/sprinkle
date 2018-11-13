
(function() {

    'use strict';

    angular.module('sprinkle').controller("profileController", profileController);

    profileController.$inject = ['locals'];

    function profileController(locals) {

        /* jshint validthis: true */
        var vm = this;

        vm.user = locals.data;


    }

})();
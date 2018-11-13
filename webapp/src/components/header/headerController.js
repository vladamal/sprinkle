
(function() {

    'use strict';

    angular.module('sprinkle').controller("headerController", headerController);

    headerController.$inject = ['$state', 'toastr', 'plantService'];

    function headerController($state, toastr, plantService) {

        /* jshint validthis: true */
        var vmHeader = this;


        vmHeader.selectedPlants = plantService.selected;


        vmHeader.wipeData = function () {
            plantService.removePlants()
                .then(function (response) {
                    //if (!response.data.success) {
                        toastr.warning('test', 'wipe');
                    $state.go('plants');
                    //} else {
                    //    toastr.success('Login', 'Welcome. ');
                    //}
                });
        };

        vmHeader.refreshData = function () {
            plantService.insertPlants()
                .then(function (response) {
                    //if (!response.data.success) {
                    toastr.success('test', 'refresh');
                    $state.go('plants');
                    //} else {
                    //    toastr.success('Login', 'Welcome. ');
                    //}
                });
        };

        //vm.profile = function() {
        //    userService.getUser().$promise
        //        .then(function(data) {
        //            $mdDialog.show({
        //                controller: 'profileController',
        //                controllerAs: 'vm',
        //                locals: { data: data.user},
        //                templateUrl: 'src/components/user/profile/profileView.html',
        //                clickOutsideToClose:false,
        //                openFrom : "left",
        //                closeTo: "left",
        //                fullscreen: false
        //            });
        //        })
        //        .catch(function (error) {
        //            $log.debug('user get error');
        //            $log.error(error);
        //        });
        //};


        //vm.languages = [
        //    { akronim: 'rn', name: 'Po ruski',  image: 'assets/images/flag-bosnia.png' },
        //    { akronim: 'sr', name: 'Srpski',    image: 'assets/images/flag-serbia.png' },
        //    { akronim: 'en', name: 'English',   image: 'assets/images/flag-uk.png' }
        //];
        //
        //vm.changeLanguage = function (key) {
        //    $translate.use(key);
        //};

    }

})();

(function() {

    'use strict';

    angular.module('sprinkle').controller("loginController", loginController);

    loginController.$inject = ['$mdDialog', '$translate', 'userService', '$log', 'toastr', '$state', '$window'];

    function loginController($mdDialog, $translate, userService, $log, toastr, $state, $window) {

        /* jshint validthis: true */
        var vmLogin = this;

        vmLogin.tooltip = {
            username    : $translate.instant('tooltip.USERNAME'),
            password    : $translate.instant('tooltip.PASSWORD')
        };


        //function verify (data) {
        //    //console.log('showAlert');
        //    // Appending dialog to document.body to cover sidenav in docs app
        //    // Modal dialogs should fully cover application
        //    // to prevent interaction outside of dialog
        //    $mdDialog.show(
        //        $mdDialog.alert()
        //            .parent(angular.element(document.querySelector('#popupContainer')))
        //            .clickOutsideToClose(true)
        //            .title('Entering the void.')
        //            .textContent('Drive carefully')
        //            .ariaLabel('md dialog')
        //            .ok('Let\'s go')
        //    );
        //}

        vmLogin.signup = function() {
            $mdDialog.show({
                controller: 'signupController',
                controllerAs: 'vm',
                templateUrl: 'src/components/user/signup/signupView.html',
                clickOutsideToClose:false,
                openFrom : "left",
                closeTo: "left"
            })

                .then(function() {
                    $state.go('plants');
                })
                .catch(function(data) {
                    console.log('sign up -> login controller');
                    console.log(data);
                });
        };


        vmLogin.user = {
            username: '',
            password: ''
        };
        vmLogin.login = function(user) {
            userService.login(user)
                .then(function (response) {
                    if (!response.data.success) {
                        toastr.error(response.data.message, 'Unsuccessful login.');
                    } else {

                        //var token = response.data.token.split(" ");

                        $window.localStorage.setItem('token', response.data.token);
                        $state.go('plants');
                        toastr.success('Login', 'Welcome. ');
                    }
                })
                .catch(function (error) {
                    $log.debug('status not 200 - login catch');
                    $log.error(error);
                });
        };

    }

})();
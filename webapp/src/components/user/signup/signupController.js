
(function() {

    'use strict';

    angular.module('sprinkle').controller("signupController", signupController);

    signupController.$inject = ['$mdDialog', '$translate', 'userService', 'toastr', '$log', '$state', '$window'];

    function signupController($mdDialog, $translate, userService, toastr, $log, $state, $window) {

        /* jshint validthis: true */
        var vm = this;
        vm.compare = '';

        vm.tooltip = {
            firstname   : $translate.instant('tooltip.FIRSTNAME'),
            lastname    : $translate.instant('tooltip.LASTNAME'),
            username    : $translate.instant('tooltip.USERNAME'),
            email       : $translate.instant('tooltip.EMAIL'),
            password    : $translate.instant('tooltip.PASSWORD')
        };

        vm.cancel = function() {
            $mdDialog.cancel();
        };

        var verificationData = {};

        vm.signup = function(user) {
            userService.createUser(user)
                .then(function (response) {
                    verificationData.username = response.data.username;
                    if (response.data.username) {
                        $mdDialog.hide();
                        toastr.warning('Proverite va\u0161 e-mail.', 'Uspe\u0161no ste se registrovali. ');

                        $mdDialog.show({
                            controller: 'verifyController',
                            controllerAs: 'vm',
                            templateUrl: 'src/components/user/signup/verify/verifyView.html',
                            clickOutsideToClose:false,
                            openFrom : "left",
                            closeTo: "left"
                        }).then(function(code) {
                            verificationData.code = code;
                            userService.verify(verificationData).then(function(response) {
                                if (response.data.success) {
                                    $window.localStorage.setItem('token', response.data.token);
                                    $state.go('plants');
                                    toastr.success(response.data.message, ' Sre\u0107an rad! ');
                                } else {
                                    toastr.warning(response.data.message, ' Gre\u0161ka! ');
                                }
                            });
                        }).catch(function(err) {
                            $log.error('verify modal catch');
                            console.log(err);
                        });
                    } else {
                        toastr.error(response.data.message, 'Gre\u0161ka');
                    }
                })
                .catch(function (error) {
                    $log.debug(' signup controller error ');
                    $log.error(error);
                });

        };

    }

})();
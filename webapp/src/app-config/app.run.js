
angular.module("sprinkle").run(["$rootScope", "$window", "$state", "$mdDialog",
    function ($rootScope, $window, $state, $mdDialog) {


        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            if (toState.name == 'login' && ($window.localStorage.getItem("token") != null)) {
                event.preventDefault();

                var confirm = $mdDialog.confirm()
                    .theme('docs-dark')
                    .title('Upozorenje - ulogovani ste')
                    .textContent('Da li zelite da napustite aplikaciju (izlogujete se) ?')
                    .ariaLabel('login warning')
                    .ok('Da')
                    .cancel('Ne');

                $mdDialog.show(confirm).then(function() {
                    console.log('da');
                    $window.localStorage.removeItem('token');
                    $state.go('login');
                }, function() {
                    console.log('ne');
                });

                $state.go(fromState.name);
            }

            if ((toState.requireLogin) && ($window.localStorage.getItem("token") == null)) {
                //console.log(toState);
                //console.log('if');
                event.preventDefault();
                $state.go('login');

            }

        });


    }]);
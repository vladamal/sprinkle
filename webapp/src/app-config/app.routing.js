
(function() {

    'use strict';

    angular.module("sprinkle")
        .config(["$stateProvider", "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {

                $stateProvider

                    .state('plants', {
                        url:'/',
                        views:{
                            'header': {
                                templateUrl:'src/components/header/headerView.html',
                                controller: 'headerController',
                                controllerAs: 'vmHeader'
                            },
                            'content': {
                                templateUrl:'src/components/plants/plantsView.html',
                                controller: 'plantsController',
                                controllerAs: 'vmGrids'
                            }
                        },
                        requireLogin: true,
                        data: {
                            title: 'home.HOME'
                        }
                    })

                    .state('login', {
                        url:'/login',
                        views: {
                            'content@': {
                                templateUrl: 'src/components/user/login/loginView.html',
                                controller: 'loginController',
                                controllerAs: 'vmLogin'
                            }
                        },
                        requireLogin: false,
                        data: {
                            title: 'login.LOGIN_TITLE'
                        }
                    });

                $urlRouterProvider.otherwise('/');

            }
        ]);
}());

(function(){

    'use strict';

    angular.module('sprinkle').factory( "userService", userService );

    userService.$inject = [ "restResourceService", "restService" ];

    function userService( restResourceService, restService ){

        return {
            getUsers    : getUsers,

            createUser  : createUser,
            getUser     : getUser,
            getUserById : getUserById,

            login       : login,
            verify      : verify
        };


        function createUser(user) {
            return restService.postServerRequest(user, 'user');
        }

        function getUser() {
            return restResourceService.resource("user/username").queryOne();
        }

        function getUsers() {
            return restResourceService.resource("user/users").query();
        }

        function getUserById(id) {
            var _id = { id: id};
            return restResourceService.resource("user").get(_id);
        }

        function login(user) {
            return restService.postServerRequest(user, 'user/login');
        }

        function verify(verificationData) {
            return restService.postServerRequest(verificationData, 'user/verify');
        }


    }
}());
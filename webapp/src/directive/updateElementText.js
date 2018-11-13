(function () {

    'use strict';

    angular.module('sprinkle').directive("updateElementText", updateElementText);

    updateElementText.$inject = ['$rootScope', '$timeout', '$translate'];

    /**
     *
     * @param $rootScope
     * @param $timeout
     * @param $translate
     * @returns {{link: Function}}
     */

    function updateElementText($rootScope, $timeout, $translate) {
        return {
            link: function(scope, element) {

                var listener = function(event, toState) {

                    var title = 'Sprinkle';
                    if (toState.data && toState.data.title){
                        title = $translate.instant(toState.data.title);
                    }

                    $timeout(function() {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
}());
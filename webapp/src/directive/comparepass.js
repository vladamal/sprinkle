(function () {

    'use strict';

    angular.module('sprinkle').directive("comparepass", comparepass);

    comparepass.$inject = [];

    function comparepass() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=comparepass"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.comparepass = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }
}());
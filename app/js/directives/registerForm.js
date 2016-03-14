(function() {

  'use strict';

  function registerForm() {

    return {
      replace: true,
      restrict: 'E',
      templateUrl: "app/views/register.html",
    };
  }

  angular
    .module('workshop-app')
    .directive('registerForm', registerForm);

}());

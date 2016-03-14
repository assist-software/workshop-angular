(function() {

  'use strict';

  function topMenu() {

    return {
      replace: true,
      restrict: 'E',
      templateUrl: "app/views/navbar.html",
    };
  }

  angular
    .module('workshop-app')
    .directive('topMenu', topMenu);

}());

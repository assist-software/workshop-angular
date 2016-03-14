(function() {

  'use strict';

  function mainCtrl($scope, User, Auth, $location) {
    var self = this;

    self.logout = function() {
      Auth.logout();
      $location.path('/login');
    }

    return ($scope.main = self);
  }

  mainCtrl
    .$inject = ['$scope', 'User', 'Auth', '$location'];
  angular
    .module('workshop-app')
    .controller('mainCtrl', mainCtrl)
}());

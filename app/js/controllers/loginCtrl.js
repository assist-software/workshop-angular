(function() {

  'use strict';

  function loginCtrl($scope, $localStorage, $location, Auth) {
    var self = this;

    isLoggedIn();

    function isLoggedIn() {
      var tokenClaims = Auth.getTokenClaims();
      if (tokenClaims && tokenClaims._doc) {
        if (tokenClaims._doc && tokenClaims._doc.isAdmin === true)
          $location.path('/admin');
        else
          $location.path('/user');
      }
    }

    function successAuth(res) {
      $localStorage.token = res.token;
      isLoggedIn();
    }

    function errorAuth(err) {
      alert('Auth failed !');
    }

    self.signin = function(email, password) {
      var formData = {
        email: email,
        password: password
      };
      Auth.signin(formData, successAuth, errorAuth);
    }

    return ($scope.lCtrl = self);
  }

  loginCtrl
    .$inject = ['$scope', '$localStorage', '$location', 'Auth'];
  angular
    .module('workshop-app')
    .controller('loginCtrl', loginCtrl)


}());

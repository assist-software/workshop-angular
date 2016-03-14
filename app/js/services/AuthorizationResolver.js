(function() {

  'use strict';

  function resolver($q, Auth) {
    return {
      authenticated: function() {
        var currentUser = Auth.getTokenClaims()._doc;
        if (currentUser && currentUser.email) {
          return currentUser;
        } else {
          return $q.reject('not authorized');
        }
      },

      isAdmin: function() {
        var currentUser = Auth.getTokenClaims()._doc;
        if (currentUser && currentUser.isAdmin === true) {
          return currentUser
        } else {
          return $q.reject('not authorized');
        }
      }
    }
  }

  resolver
    .$inject = ['$q', 'Auth'];
  angular
    .module('workshop-app')
    .factory('resolver', resolver)
}());

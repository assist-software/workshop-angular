(function() {

  'user strict';

  function Auth($http, $localStorage, urls, decoder) {
    function tokenClaims() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = JSON.parse(decoder.urlBase64Decode(encoded));
      }
      return user;
    }

    return {
      signin: function(data, success, error) {
        $http.post(urls.BASE_API + '/authenticate', data)
          .success(success)
          .error(error);
      },
      getTokenClaims: function() {
        return tokenClaims();
      },
      logout: function() {
        delete $localStorage.token;
      }
    }
  }

  Auth
    .$inject = ['$http', '$localStorage', 'urls', 'decoder']
  angular
    .module('workshop-app')
    .factory('Auth', Auth);
}())

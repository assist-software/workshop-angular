(function() {

  'user strict';

  function decoder() {
    this.urlBase64Decode = function(token) {
      var output = token.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }
  }

  angular
    .module('workshop-app')
    .service('decoder', decoder);
}())

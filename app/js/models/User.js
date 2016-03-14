(function() {

  'use strict';

  function UsersW($resource, urls) {

    function User() {
      this.list = '';
      this.resource = $resource(urls.BASE_API + '/users', {});
    }

    User.prototype.getList = function() {
      var self = this;
      var loadList = self.resource.query();
      loadList.$promise.then(function(res) {
        self.list = res;
      });

      return loadList;
    }

    User.prototype.register = function(data) {
      var self = this;
      var userDetails = self.resource.save(data);
      userDetails.$promise.then(function(res) {
        self.details = res;
      });

      return userDetails;
    }

    return User;
  }

  UsersW
    .$inject = ['$resource', 'urls'];
  angular
    .module('workshop-app')
    .factory('User', UsersW)
}());

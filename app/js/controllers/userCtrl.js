(function() {

  'use strict';

  function userCtrl($scope, User) {
    var self = this;
    var users = new User();

    self.gridUsers = {
      data: null,
      enableFiltering: true,
      columnDefs: [{
        field: '_id',
        enableCellEdit: false
      }, {
        field: 'email',
        enableCellEdit: false
      }, {
        field: 'name',
        displayName: 'Numele',
        enableCellEdit: true
      }, {
        field: 'isAdmin',
        enableFiltering: false,
        width: '10%'
      }]
    };

    users.getList().$promise.then(function() {
      self.gridUsers.data = users.list;
    });

    self.register = function(data) {
      users.register(data).$promise.then(function(data) {
        alert("Registered");
        self.gridUsers.data.push(data);
      }, function() {
        alert("Failed");
      });
    };

    return ($scope.uCtrl = self);
  }

  userCtrl
    .$inject = ['$scope', 'User'];
  angular
    .module('workshop-app')
    .controller('userCtrl', userCtrl)
}());

(function() {

  'use strict';

  function adminCtrl($scope, User) {
    var self = this;
    var users = new User();

    self.gridUsersAdmin = {
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
      self.gridUsersAdmin.data = users.list;
    });

    self.register = function(data) {
      users.register(data).$promise.then(function(data) {
        alert("Registered");
        self.gridUsersAdmin.data.push(data);
      }, function() {
        alert("Failed");
      });
    };

    return ($scope.aCtrl = self);
  }

  adminCtrl
    .$inject = ['$scope', 'User'];
  angular
    .module('workshop-app')
    .controller('adminCtrl', adminCtrl)
}());

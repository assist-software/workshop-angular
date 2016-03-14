(function() {
  'use strict';

  angular.module('workshop-app', [
    'ngResource',
    'ngRoute',
    'ngStorage',
    'ui.grid'
  ])

  .constant('urls', {
    BASE: 'https://your-backend.com/',
    BASE_API: 'https://your-backend.com/api'
  });

  function RequestService($q, $location, $localStorage) {

    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers['x-access-token'] = $localStorage.token;
        }
        return config;
      },

      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }

  function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('RequestService');

    var routeRoleChecks = {
      user: {
        currentUser: function(resolver) {
          return resolver.authenticated();
        }
      },
      admin: {
        currentUser: function(resolver) {
          return resolver.isAdmin();
        }
      }
    };

    $routeProvider
      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'loginCtrl'
      })

    .when('/user', {
        templateUrl: 'app/views/user.html',
        controller: 'userCtrl',
        resolve: routeRoleChecks.user
      })
      .when('/admin', {
        templateUrl: 'app/views/admin.html',
        controller: 'adminCtrl',
        resolve: routeRoleChecks.admin
      })

    .otherwise({ redirectTo: '/login' });
  }

  function run($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, currentUser, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/login');
      }
    })
  }

  config
    .$inject = ['$routeProvider', '$httpProvider'];

  run
    .$inject = ['$rootScope', '$location'];

  RequestService
    .$inject = ['$q', '$location', '$localStorage'];

  angular
    .module('workshop-app')
    .factory('RequestService', RequestService)
    .config(config)
    .run(run)
}())

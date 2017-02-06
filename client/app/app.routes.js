'use strict';

angular.module('VideoPortal')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'app/components/home/home.view.html'
      })
      .when('/login', {
        controller: 'AuthController',
        templateUrl: 'app/components/auth/login.view.html'
      })
      .when('/signout', {
        controller: 'AuthController',
        template: ' '
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);

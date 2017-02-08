'use strict';

angular.module('VideoPortal', [
  'ngRoute',
  'ngCookies',
  'angular-md5',
  'angularGrid',
  'angular-rating'
])

  .constant('Constants', {
    pageSize: 10
  })
  
  .run(['$rootScope', '$location', 'AuthService',
    function ($rootScope, $location, AuthService) {
      /* Check if the user is logged, otherwise redirect to login page */
      $rootScope.$on('$routeChangeStart', function () {
        if (!AuthService.isLoggedIn()) {
          $location.path('/login');
        }
      });
    }
  ]);

'use strict';

angular.module('VideoPortal', [
  'ngRoute',
  'ngCookies',
  'angular-md5',
  'angularGrid',
  'toaster',
  'ngRateIt',
  'infinite-scroll'
])

  .constant('Constants', {
    pageSize: 10
  })
  
  .run(['$rootScope', '$location', 'AuthService',
    function ($rootScope, $location, AuthService) {
      /* Check if the user is logged, otherwise redirect to login page */
      $rootScope.$on('$routeChangeStart', function () {
        if ($location.path() !== '/login' && !AuthService.isLoggedIn()) {
          $location.path('/login');
        }
      });
    }
  ]);

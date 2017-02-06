'use strict';

angular.module('VideoPortal').controller('AuthController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {
    $scope.user = {};
    $scope.doLogin = function doLogin(user) {
      AuthService.login(user);
    };
    $scope.logout = function logout() {
      AuthService.logout();
      // $location.path('/login');
    };
    if ($location.path() === '/signout') $scope.logout();
  }
]);

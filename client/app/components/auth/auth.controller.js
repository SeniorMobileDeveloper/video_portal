'use strict';

angular.module('VideoPortal').controller('AuthController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {
    $scope.user = {};

    $scope.doLogin = function doLogin(user) {
      delete $scope.error;
      AuthService.login(user).catch(function (err) {
        $scope.error = err;
      });
    };

    $scope.logout = function logout() {
      AuthService.logout();
    };
    if ($location.path() === '/goodbye') $scope.logout();
  }
]);

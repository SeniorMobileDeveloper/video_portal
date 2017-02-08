'use strict';

function HeaderController($rootScope, $location, AuthService) {
  var ctrl = this;
  ctrl.user = AuthService.getUsername();
  $rootScope.$on('$routeChangeStart', function () {
    ctrl.user = AuthService.getUsername();
  });
  ctrl.logout = function logout() {
    $location.path('/goodbye');
  }
  ctrl.goHome = function goHome() {
    $location.path('/');
  }
}

angular.module('VideoPortal').component('videoPortalHeader', {
  templateUrl: 'app/components/header/header.view.html',
  controller: HeaderController
});

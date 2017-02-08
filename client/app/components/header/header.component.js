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
}

angular.module('VideoPortal').component('videoPortalHeader', {
  templateUrl: 'app/components/header/header.view.html',
  controller: HeaderController
});

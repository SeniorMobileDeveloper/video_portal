'use strict';

function HeaderController(AuthService) {
  this.user = AuthService.isLoggedIn();
}

angular.module('VideoPortal').component('videoPortalHeader', {
  templateUrl: 'app/components/header/header.view.html',
  controller: HeaderController
});
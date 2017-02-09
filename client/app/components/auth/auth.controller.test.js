'use strict';

describe('AuthController', function () {
  // Nothing relevant to be tested here
  var mockedAuthService = {
    login: function () { return true; },
    logout: function () { return true; }
  };
  var $controller;
  var $scope;

  beforeEach(angular.mock.module('VideoPortal'));

  beforeEach(function () {
    angular.mock.module(function ($provide) {
      $provide.value('AuthService', mockedAuthService);
    });
    inject(function ($injector) {
      $controller = $injector.get('$controller');
      $scope = $injector.get('$rootScope').$new();
    });
  });

  it('should doLogin function be defined', function () {
    $controller('AuthController', {$scope:$scope});
    expect($scope.doLogin).toBeDefined();
  });

  it('should logout function be defined', function () {
    $controller('AuthController', {$scope:$scope});
    expect($scope.logout).toBeDefined();
  });
});

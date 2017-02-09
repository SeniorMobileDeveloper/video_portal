'use strict';

describe('HomeController', function () {
  var $q;
  var deferred;
  var mockedVideoService = {
    getVideos: function () { return deferred.promise; }
  };
  var $controller;
  var $scope;

  beforeEach(angular.mock.module('VideoPortal'));

  beforeEach(function () {
    angular.mock.module(function ($provide) {
      $provide.value('VideoService', mockedVideoService);
    });
    inject(function ($injector) {
      $controller = $injector.get('$controller');
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      deferred = $q.defer();
    });
  });

  it('should instantiate controller', function () {
    $controller('HomeController', {$scope:$scope});
    expect($scope.loading).toBe(true);
    expect($scope.end).toBe(false);
    expect($scope.videos).toBeDefined();
  });

});

'use strict';

describe('HomeController', function () {
  var $q;
  var deferred;
  var mockedVideoService = {
    getVideos: function () { return deferred.promise; }
  };
  var $controller;
  var $rootScope;
  var $scope;
  var video = {
    _id: 'videoId',
    name: 'videoName',
    url: '/test/url.mp4',
    description: 'This is a test description',
    ratings: [1, 3, 5]
  };
  var videosArray = [video];

  beforeEach(angular.mock.module('VideoPortal'));

  beforeEach(function () {
    angular.mock.module(function ($provide) {
      $provide.value('VideoService', mockedVideoService);
    });
    inject(function ($injector) {
      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $q = $injector.get('$q');
      deferred = $q.defer();
    });
  });

  it('should instantiate controller', function () {
    $controller('HomeController', {$scope:$scope});
    expect($scope.loading).toBe(true);
    expect($scope.end).toBe(false);
    expect($scope.videos).toBeDefined();
    deferred.resolve(videosArray);
    $rootScope.$apply();
    expect($scope.videos).toEqual(videosArray);
  });

  it('should load more videos', function () {
    $controller('HomeController', {$scope:$scope});
    deferred.resolve(videosArray);
    $rootScope.$apply();
    expect($scope.videos).toEqual(videosArray);
    $scope.loadMore();
    deferred.resolve(videosArray);
    $rootScope.$apply();
    expect($scope.videos).toEqual(videosArray.concat(videosArray));
  });

  it('should not load more videos when reached end', function () {
    $controller('HomeController', {$scope:$scope});
    deferred.resolve(videosArray);
    $rootScope.$apply();
    expect($scope.videos).toEqual(videosArray);
    $scope.end = true;
    $scope.loadMore();
    deferred.resolve(videosArray);
    $rootScope.$apply();
    expect($scope.videos).toEqual(videosArray);
  });

  it('should stop loading videos when empty response', function () {
    $controller('HomeController', {$scope:$scope});
    deferred.resolve([]);
    $rootScope.$apply();
    $scope.loadMore();
    deferred.resolve([]);
    $rootScope.$apply();
    expect($scope.loading).toBe(false);
    expect($scope.end).toBe(true);
  });

});

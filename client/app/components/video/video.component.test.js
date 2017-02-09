'use strict';

describe('videoComponent', function () {
  var $componentController;
  var $location;
  var $q;
  var $rootScope;
  var $routeParams;
  var video = {
    _id: 'videoId',
    name: 'videoName',
    url: '/test/url.mp4',
    description: 'This is a test description',
    ratings: [1, 3, 5]
  };
  var deferred;
  var mockedVideoService = {
    getSingleVideo: function () { return deferred.promise; },
    rateVideo: function () { return deferred.promise; }
  };
  var bindings = { video: video };

  beforeEach(angular.mock.module('VideoPortal', function ($provide) {
    $provide.value('VideoService', mockedVideoService);
  }));
  beforeEach(inject(function (_$componentController_, $injector) {
    $componentController = _$componentController_;
    $location = $injector.get('$location');
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');
    $routeParams = $injector.get('$routeParams');
    deferred = $q.defer();
  }));

  it('should create component', function () {
    var ctrl = $componentController('videoComponent', null, bindings);
    expect(ctrl.video).toBeDefined();
    expect(ctrl.video).toBe(video);
  });

  it('should call $onInit function to calculate rating', function () {
    var ctrl = $componentController('videoComponent', null, bindings);
    ctrl.$onInit();
    expect(ctrl.rating).toBeDefined();
    expect(ctrl.rating).toBe(3);
  });

  it('should call goToVideoDetailPage function and change location', function () {
    var ctrl = $componentController('videoComponent', null, bindings);
    ctrl.goToVideoDetailPage();
    expect($location.path()).toBe('/video/videoId');
  });

  it('should setRating', function () {
    var ctrl = $componentController('videoComponent', null, bindings);
    ctrl.setRating(5);
    deferred.resolve(video);
    $rootScope.$apply();
    expect(ctrl.ranked).toBe(true);
  });

  it('should initialize video without binding', function () {
    $routeParams.id = 'test';
    var ctrl = $componentController('videoComponent');
    deferred.resolve(video);
    $rootScope.$apply();
    expect(ctrl.video).toBe(video);
    expect(ctrl.rating).toBe(3);
  });

});
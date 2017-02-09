'use strict';

describe('VideoService', function () {
  var VideoService;
  var $httpBackend;
  var $cookies;
  beforeEach(angular.mock.module('VideoPortal'));
  beforeEach(inject(function (_VideoService_, $injector) {
    VideoService = _VideoService_;
    $httpBackend = $injector.get('$httpBackend');
    $cookies = $injector.get('$cookies');
  }));

  afterEach(function () {
    $cookies.remove('sessionId');
    $cookies.remove('username');
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get an instance of VideoService', function () {
    expect(VideoService).toBeDefined();
  });

  describe('getVideos', function () {
    it('should be defined', function () {
      expect(VideoService.getVideos).toBeDefined();
    });

    it('should get videos with limit and skip params', function () {
      $cookies.put('sessionId', 'test');
      var query = {
        limit: 10,
        skip: 10
      };
      $httpBackend.when('GET', '/videos?sessionId=test&limit=10&skip=10')
        .respond(200, {
          data: []
        });
      var response = VideoService.getVideos(query);
      $httpBackend.flush();
      expect(response).toBeDefined();
    });

    it('should get error in video response', function () {
      $cookies.put('sessionId', 'test');
      var query = {
        limit: 10,
        skip: 10
      };
      $httpBackend.when('GET', '/videos?sessionId=test&limit=10&skip=10')
        .respond(200, {
          status: 'error'
        });
      var response = VideoService.getVideos(query);
      $httpBackend.flush();
      expect(response).toBeDefined();
    });
  });

  describe('getSingleVideo', function () {
    it('should be defined', function () {
      expect(VideoService.getSingleVideo).toBeDefined();
    });

    it('should get single video', function () {
      $cookies.put('sessionId', 'test');
      $httpBackend.when('GET', '/video?sessionId=test&videoId=testId')
        .respond(200, {
          data: []
        });
      var response = VideoService.getSingleVideo('testId');
      $httpBackend.flush();
      expect(response).toBeDefined();
    });

    it('should get error for single video when not logged in', function () {
      $httpBackend.when('GET', '/video?videoId=testId')
        .respond(401, {});
      var response = VideoService.getSingleVideo('testId');
      $httpBackend.flush();
      expect(response).toBeDefined();
    });

  });

  describe('rateVideo', function () {
    it('should be defined', function () {
      expect(VideoService.rateVideo).toBeDefined();
    });

    it('should get single video', function () {
      $cookies.put('sessionId', 'test');
      var data = {
        videoId: 'testId',
        rating: 5
      };
      $httpBackend.when('POST', '/video/ratings?sessionId=test', data)
        .respond(200, {
          data: []
        });
      var response = VideoService.rateVideo('testId', 5);
      $httpBackend.flush();
      expect(response).toBeDefined();
    });

  });

});
'use strict';

describe('AuthService', function () {
  var AuthService;
  var $httpBackend;
  var $cookies;
  var md5;
  beforeEach(angular.mock.module('VideoPortal'));
  beforeEach(inject(function (_AuthService_, _md5_) {
    AuthService = _AuthService_;
    md5 = _md5_;
  }));
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $cookies = $injector.get('$cookies');
  }));

  afterEach(function () {
    $cookies.remove('sessionId');
    $cookies.remove('username');
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get an instance of AuthService', function () {
    expect(AuthService).toBeDefined();
  });

  describe('login', function () {
    it('should be defined', function () {
      expect(AuthService.login).toBeDefined();
    });

    it('should set cookies on login', function () {
      var user = {
        username: 'test',
        password: md5.createHash('password')
      };
      $httpBackend.when('POST', '/user/auth', user)
        .respond(200, {
          username: 'john',
          sessionId: 'test'
        });
      AuthService.login({
        username: 'test',
        password: 'password'
      });
      $httpBackend.flush();
      expect($cookies.get('sessionId')).toBe('test');
      expect($cookies.get('username')).toBe('john');
    });
  });

  describe('logout', function () {
    it('should be defined', function () {
      expect(AuthService.logout).toBeDefined();
    });

    it('should clear cookies on logout', function () {
      $cookies.put('sessionId', 'test');
      $cookies.put('username', 'test');
      $httpBackend.when('GET', '/user/logout?sessionId=test')
        .respond(200, {
          success: 'true'
        });
      AuthService.logout();
      $httpBackend.flush();
      expect($cookies.get('sessionId')).toBeUndefined();
      expect($cookies.get('username')).toBeUndefined();
    });

    it('should not clear cookies on error response', function () {
      $cookies.put('sessionId', 'test');
      $cookies.put('username', 'test');
      $httpBackend.when('GET', '/user/logout?sessionId=test')
        .respond(401, {});
      AuthService.logout();
      $httpBackend.flush();
      expect($cookies.get('sessionId')).toBe('test');
      expect($cookies.get('username')).toBe('test');
    });

    it('should not clear cookies on failed logout', function () {
      $cookies.put('sessionId', 'test');
      $cookies.put('username', 'test');
      $httpBackend.when('GET', '/user/logout?sessionId=test')
        .respond(200, {
          status: 'error',
          error: 'Error msg'
        });
      AuthService.logout();
      $httpBackend.flush();
      expect($cookies.get('sessionId')).toBe('test');
      expect($cookies.get('username')).toBe('test');
    });

  });

  describe('isLoggedIn', function () {
    it('should be defined', function () {
      expect(AuthService.isLoggedIn).toBeDefined();
    });

    it('should be true when sessionId cookie exists', function () {
      $cookies.put('sessionId', 'test');
      expect(AuthService.isLoggedIn()).toBe(true);
    });

    it('should be false when sessionId cookie does not exist', function () {
      expect(AuthService.isLoggedIn()).toBe(false);
    });

  });

  describe('getUsername', function () {
    it('should be defined', function () {
      expect(AuthService.getUsername).toBeDefined();
    });

    it('should get username when cookie exists', function () {
      $cookies.put('username', 'test');
      expect(AuthService.getUsername()).toBe('test');
    });

    it('should be undefined when username cookie does not exist', function () {
      expect(AuthService.getUsername()).toBeUndefined();
    });

  });

});
'use strict';

describe('AuthService', function () {
  var AuthService;
  var $httpBackend;
  var $cookies;
  var authRequestHandler;
  beforeEach(angular.mock.module('VideoPortal'));
  beforeEach(inject(function (_AuthService_) {
    AuthService = _AuthService_;
  }));
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $cookies = $injector.get('$cookies');
    authRequestHandler = $httpBackend.when('POST', '/login', {
      username: 'user',
      password: 'password'
    })
      .respond(200, {
        data: {
          username: 'user',
          sessionId: 'session'
        }
      });
  }));

  it('should get an instance of AuthService', function () {
    expect(AuthService).toBeDefined();
  });

  describe('login', function () {
    it('should exist', function () {
      expect(AuthService.login).toBeDefined();
    });

    it('should do successful login', function () {
      AuthService.login({
        username: 'user',
        password: 'password'
      });
      
      expect($cookies.get('username')).toBe('user');
    });

  });

});
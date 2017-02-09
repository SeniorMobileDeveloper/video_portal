'use strict';

describe('headerComponent', function () {
  var $componentController;
  var $location;
  var mockedAuthService = {
    getUsername: function () { return 'testUser'; }
  };

  beforeEach(angular.mock.module('VideoPortal', function ($provide) {
    $provide.value('AuthService', mockedAuthService);
  }));
  beforeEach(inject(function (_$componentController_, $injector) {
    $componentController = _$componentController_;
    $location = $injector.get('$location');
  }));

  it('should create component', function () {
    var ctrl = $componentController('videoPortalHeader');
    expect(ctrl.user).toBeDefined();
    expect(ctrl.user).toBe('testUser');
  });

  it('should call logout function and change location', function () {
    var ctrl = $componentController('videoPortalHeader');
    ctrl.logout();
    expect($location.path()).toBe('/goodbye');
  });

  it('should call goHome function and change location', function () {
    var ctrl = $componentController('videoPortalHeader');
    ctrl.goHome();
    expect($location.path()).toBe('/');
  });

});
'use strict';

angular.module('VideoPortal', [
  'ngRoute',
  'ngCookies',
  'angular-md5',
  'angularGrid',
  'angular-rating'
])

  .constant('Constants', {
    pageSize: 10
  });

'use strict';

angular.module('VideoPortal')
  .factory('AuthService', ['$http', '$cookies', '$location', 'md5',
    function ($http, $cookies, $location, md5) {
      var baseUrl = '/user';
      var loginUrl = baseUrl + '/auth';
      var logoutUrl = baseUrl + '/logout';
      return {
        login: function login(user) {
          var data = {
            username: user.username,
            password: md5.createHash(user.password)
          };
          return $http.post(loginUrl, data)
            .then(function success(response) {
              if (!response || !response.data || response.data.status === 'error') {
                throw new Error(response && response.data ? response.data.error : 'Error in login, please try again');
              }
              $cookies.put('username', response.data.username);
              $cookies.put('sessionId', response.data.sessionId);
              $location.path('/');
            });
        },
        logout: function logout() {
          var config = {
            params: {
              sessionId: $cookies.get('sessionId')
            }
          };
          return $http.get(logoutUrl, config)
            .then(function success(response) {
              if (!response || !response.data || response.data.status === 'error') {
                throw new Error(response && response.data ? response.data.error : 'Error in login, please try again');
              }
              $cookies.remove('username');
              $cookies.remove('sessionId');
              $location.path('/login');
            });
        }
      };
    }
  ]);

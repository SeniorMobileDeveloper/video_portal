'use strict';

angular.module('VideoPortal')
  .factory('AuthService', ['$http', '$cookies', 'md5',
    function ($http, $cookies, md5) {
      var baseUrl = '/user';
      var loginUrl = baseUrl + '/auth';
      var logoutUrl = baseUrl + '/logout';
      return {
        login: function login(user) {
          user.password = md5.createHash(user.password);
          return $http.post(loginUrl, user)
            .then(function success(response) {
              console.log(response);
              $cookies.put('username', response.data.username);
              $cookies.put('sessionId', response.data.sessionId);
            }, function error(response) {
              console.log(response);
            });
        },
        logout: function logout() {
          console.log($cookies.getAll());
          var config = {
            params: {
              sessionId: $cookies.get('sessionId')
            }
          };
          return $http.get(logoutUrl, config)
            .then(function success(response) {
              console.log(response);
              // $cookies.remove('username');
              // $cookies.remove('sessionId');
            }, function error(response) {
              console.log(response);
            });
        }
      };
    }
  ]);

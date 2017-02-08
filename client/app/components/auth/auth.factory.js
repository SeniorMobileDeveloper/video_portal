'use strict';

angular.module('VideoPortal')
  .factory('AuthService', ['$http', '$cookies', '$location', 'md5', 'toaster',
    function ($http, $cookies, $location, md5, toaster) {
      var baseUrl = '/user';
      var loginUrl = baseUrl + '/auth';
      var logoutUrl = baseUrl + '/logout';

      /**
       * Display error in toast
       * @param {Object} response
       */
      var handleError = function handleAuthError(response) {
        var error;
        if (response instanceof Error) {
          error = response;
        } else {
          error = response && response.data && response.data.error ?
            response.data.error : 'Authentication error, please try again';
        }
        toaster.pop('error', error);
      };

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
              toaster.pop('success', 'Logged in successfully', 'Welcome ' + response.data.username);
            })
            .catch(handleError);
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
                throw new Error(response && response.data ? response.data.error : 'Error in logout, please try again');
              }
              toaster.pop('success', 'Logged out successfully', 'Goodbye ' + $cookies.get('username'));
              $cookies.remove('username');
              $cookies.remove('sessionId');
              $location.path('/login');
            })
            .catch(handleError);
        },
        isLoggedIn: function isLoggedIn() {
          return $cookies.get('sessionId') ? true : false;
        },
        getUsername: function getUsername() {
          return $cookies.get('username');
        },
        clearCookies: function clearCookies() {
          $cookies.remove('username');
          $cookies.remove('sessionId');
        }
      };
    }
  ]);

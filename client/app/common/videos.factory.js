'use strict';

angular.module('VideoPortal')
  .factory('VideoService', ['$http', '$cookies', '$location', 'Constants', 'AuthService', 'toaster',
    function ($http, $cookies, $location, Constants, AuthService, toaster) {
      /**
       * Handle video api response
       * @param {Object} response
       */
      var handleResponse = function handleVideoResponse(response) {
        if (!response || !response.data || response.data.status === 'error') {
          throw new Error(response && response.data ? response.data.error : 'Error fetching video');
        }
        return response.data.data;
      };

      /**
       * Display error in toast and redirect to login page if user Unauthorized
       * @param {Object} response
       */
      var handleError = function handleVideoError(response) {
        var error;
        if (response instanceof Error) {
          error = response;
        } else {
          error = response && response.data && response.data.error ?
            response.data.error : 'Look, a little and cute error!';
        }
        toaster.pop('error', error);
        if (response && response.status === 401) {
          AuthService.clearCookies();
          $location.path('/login');
        }
      };
      return {
        /**
         * Get videos listing
         * @param {Object} query
         * @returns {Promise}
         */
        getVideos: function getVideos(query) {
          var url = '/videos';
          var config = {
            params: {
              sessionId: $cookies.get('sessionId')
            }
          };
          config.params.limit = query && query.limit ? query.limit : Constants.pageSize;
          if (query && query.skip) config.params.skip = query.skip;

          return $http.get(url, config)
            .then(handleResponse)
            .catch(handleError);
        },

        /**
         * Get a single video
         * @param {String} id
         * @returns {Promise}
         */
        getSingleVideo: function getSingleVideo(id) {
          var url = '/video';
          var config = {
            params: {
              sessionId: $cookies.get('sessionId'),
              videoId: id
            }
          };

          return $http.get(url, config)
            .then(handleResponse)
            .catch(handleError);
        },

        /**
         * Post a video rating
         * @param {String} id
         * @param {Number} rating
         * @returns {Promise}
         */
        rateVideo: function rateVideo(id, rating) {
          var url = '/video/ratings';
          var data = {
            videoId: id,
            rating: rating
          };
          var config = {
            params: {
              sessionId: $cookies.get('sessionId')
            }
          };

          return $http.post(url, data, config)
            .then(handleResponse)
            .catch(handleError);
        }
      };
    }
  ]);

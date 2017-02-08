'use strict';

angular.module('VideoPortal')
  .factory('VideoService', ['$http', '$cookies', '$location', 'Constants',
    function ($http, $cookies, $location, Constants) {
      return {
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
            .then(function success(response) {
              if (!response || !response.data || response.data.status === 'error') {
                throw new Error(response && response.data ? response.data.error : 'Error fetching videos');
              }
              return response.data.data;
            })
            .catch(function error(response) {
              if (response.status === 401) {
                // TODO: show error message
                $location.path('/login');
              }
            });
        },
        getSingleVideo: function getSingleVideo(id) {
          var url = '/video';
          var config = {
            params: {
              sessionId: $cookies.get('sessionId'),
              videoId: id
            }
          };
          return $http.get(url, config)
            .then(function success(response) {
              if (!response || !response.data || response.data.status === 'error') {
                throw new Error(response && response.data ? response.data.error : 'Error fetching videos');
              }
              return response.data.data;
            })
            .catch(function error(response) {
              if (response.status === 401) {
                // TODO: show error message
                $location.path('/login');
              }
            });
        }
      };
    }
  ]);

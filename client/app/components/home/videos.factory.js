'use strict';

angular.module('VideoPortal')
  .factory('VideoService', ['$http', '$cookies', 'Constants',
    function ($http, $cookies, Constants) {
      var url = '/videos';
      return {
        getVideos: function getVideos(query) {
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
            });
        }
      };
    }
  ]);

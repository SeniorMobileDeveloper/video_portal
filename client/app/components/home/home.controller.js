'use strict';

angular.module('VideoPortal').controller('HomeController', ['$scope', 'VideoService', 'Constants', 'angularGridInstance',
  function ($scope, VideoService, Constants, angularGridInstance) {
    $scope.videos = [];
    var currentPage = 0;
    $scope.loading = true;
    $scope.end = false;
    var buffer;

    $scope.angularGridOptions = {
      gridWidth: 400, // Column width
      gutterSize: 10, // Column separation
    };

    /* Use a buffer to have next page ready */
    var loadBuffer = function loadBuffer() {
      $scope.loading = true;
      buffer = VideoService.getVideos({
        skip: Constants.pageSize * currentPage
      });
    };

    /* Add videos to the view and re-load the buffer */
    var addVideos = function addVideos(videos) {
      $scope.videos = $scope.videos.concat(videos);
      $scope.loading = false;
      currentPage++;
      loadBuffer();
    };

    /* Load videos on init */
    VideoService.getVideos().then(function handleVideosResponse(videos) {
      if (videos) addVideos(videos);
    });

    $scope.loadMore = function loadMore() {
      if ($scope.end || !buffer) return;
      buffer.then(function emptyBuffer(nextPageData) {
        if (!nextPageData.length) {
          $scope.loading = false;
          $scope.end = true;
          return;
        }
        addVideos(nextPageData);
      });
    };

  }
]);

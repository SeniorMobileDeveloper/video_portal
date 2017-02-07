'use strict';

angular.module('VideoPortal').controller('HomeController', ['$scope', 'VideoService', 'Constants', 'angularGridInstance',
  function ($scope, VideoService, Constants, angularGridInstance) {
    $scope.videos = [];
    var currentPage = 0;
    $scope.loading = true;
    $scope.end = false;
    var buffer;
    $scope.foo = 4;

    $scope.angularGridOptions = {
      gridWidth: 400,
      gutterSize: 10,
      infiniteScrollDistance: 800
    };

    /* Use a buffer to have next page ready */
    var loadBuffer = function loadBuffer() {
      $scope.loading = true;
      buffer = VideoService.getVideos({
        skip: Constants.pageSize * currentPage
      });
    };

    var addVideos = function addVideos(videos) {
      $scope.videos = $scope.videos.concat(videos);
      $scope.loading = false;
      currentPage++;
      loadBuffer();
    };

    /* Load videos on init */
    VideoService.getVideos().then(response => {
      addVideos(response);
    });

    $scope.loadMore = function loadMore() {
      if ($scope.end) return;
      buffer.then(nextPageData => {
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

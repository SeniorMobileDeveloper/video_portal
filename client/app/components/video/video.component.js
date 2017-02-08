'use strict';

function VideoController($location, $routeParams, VideoService) {
  var ctrl = this;
  if (!ctrl.video && $routeParams.id) {
    VideoService.getSingleVideo($routeParams.id)
      .then(function resolveVideo(video) {
        ctrl.video = video;
      });
  }

  ctrl.goToVideoDetailPage = function goToVideoDetailPage() {
    $location.path('/video/' + ctrl.video._id);
  }
}

angular.module('VideoPortal').component('videoComponent', {
  templateUrl: 'app/components/video/video.view.html',
  controller: VideoController,
  bindings: {
    video: '<'
  },
});

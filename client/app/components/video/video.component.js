'use strict';

function VideoController($location, $routeParams, VideoService) {
  var ctrl = this;

  function calculateRating(ratings) {
    var sum = ratings.reduce(function (total, value) {
      return total + value;
    }, 0);
    return Math.round(sum / ratings.length);
  }

  if (!ctrl.video && $routeParams.id) {
    VideoService.getSingleVideo($routeParams.id)
      .then(function resolveVideo(video) {
        ctrl.video = video;
        ctrl.rating = calculateRating(ctrl.video.ratings);
      });
  }

  /* Calculate the rating when the component gets initialized */
  ctrl.$onInit = function onInit() {
    if (ctrl.video) {
      ctrl.rating = calculateRating(ctrl.video.ratings);
    }
  }

  ctrl.goToVideoDetailPage = function goToVideoDetailPage() {
    $location.path('/video/' + ctrl.video._id);
  }

  ctrl.setRating = function setRating(newRating) {
    // TODO: handle case if already ranked
    VideoService.rateVideo(ctrl.video._id, newRating)
      .then(function (response) {
        console.log(response);
      });
  }
}

angular.module('VideoPortal').component('videoComponent', {
  templateUrl: 'app/components/video/video.view.html',
  controller: VideoController,
  bindings: {
    video: '<'
  },
});

'use strict';

function VideoController($location, $routeParams, VideoService) {
  var ctrl = this;

  /**
   * Calculate the average ranking
   * @param {Array} ratings
   * @returns {Number}
   */
  function calculateRating(ratings) {
    var sum = ratings.reduce(function (total, value) {
      return total + value;
    }, 0);
    return Math.round(sum / ratings.length);
  }

  /* Get the video from the api based on the route */
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
    if (!ctrl.ranked) {
      VideoService.rateVideo(ctrl.video._id, newRating)
        .then(function (response) {
          ctrl.ranked = true;
          // Not calculating the average again, as the user would probably be more interested in his own ranking.
        });
    }
  }
}

angular.module('VideoPortal').component('videoComponent', {
  templateUrl: 'app/components/video/video.view.html',
  controller: VideoController,
  bindings: {
    video: '<'
  },
});

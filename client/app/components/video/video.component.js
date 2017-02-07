'use strict';

/* Simple component having the template for a single item in a grid */
angular.module('VideoPortal').component('myvideo', {
  templateUrl: 'app/components/video/video.view.html',
  bindings: {
    video: '<'
  },
});

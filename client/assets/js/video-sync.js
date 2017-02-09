// Vanilla js to the rescue!

var playingVideo;

function pauseVideoBeingPlayed(video) {
  if (playingVideo && playingVideo !== video.id) {
    var videoToPause = document.getElementById(playingVideo);
    if (videoToPause) videoToPause.pause();
  }
  playingVideo = video.id;
};

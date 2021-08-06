const video = document.getElementById('video'),
  play = document.getElementById('play'),
  stop = document.getElementById('stop'),
  progress = document.getElementById('progress'),
  timestamp = document.getElementById('timestamp');
//Add event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

// FUNCTIONS
// play & pause video
function toggleVideoStatus() {
  // if video paused then played else pause it
  video.paused ? video.play() : video.pause();
}
// updat play/pause video
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}
// update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  // Get Minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  // Get Seconds
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }
  // output the mins and secs through the timestamp span
  timestamp.innerHTML = `${mins}:${seconds}`;
}
// update progress & timestamp
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}
// stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

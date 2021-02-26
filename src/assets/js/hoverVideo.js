const hoverPlayVideo = document.querySelector(".hover-play");

const handleMouseover = (event) => {
  const video = event.target;
  video.muted = true;
  video.play();
};

const handleMouseout = (event) => {
  const video = event.target;
  video.pause();
  video.currentTime = 0;
};

const handleEnded = (event) => {
  const video = event.target;
  video.currentTime = 0;
  video.play();
};

const init = () => {
  const videos = document.querySelectorAll(".hover-play");
  videos.forEach((video) => {
    video.addEventListener("mouseover", handleMouseover);
    video.addEventListener("mouseout", handleMouseout);
    video.addEventListener("ended", handleEnded);
  });
};

if (hoverPlayVideo) {
  init();
}

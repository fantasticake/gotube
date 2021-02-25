import axios from "axios";

const videoContainer = document.querySelector(".videodetail-video-container");

const getVideoId = () => {
  return window.location.href.split("/").reverse()[0];
};

const handleEnded = (event) => {
  const videoId = getVideoId();
  axios(`/api/${videoId}/register-view`);
  const views = videoContainer.querySelector(".video-container__views");
  views.innerText = Number(views.innerText) + 1;
};

const init = () => {
  const video = videoContainer.querySelector(".video-container__video");
  video.addEventListener("ended", handleEnded);
};

if (videoContainer) {
  init();
}

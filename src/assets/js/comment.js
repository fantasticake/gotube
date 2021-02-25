import axios from "axios";

const videoContainer = document.querySelector(".videodetail-video-container");

function getVideoId() {
  return window.location.href.split("/").reverse()[0];
}

const sendComment = async (text) => {
  const videoId = getVideoId();
  await axios(`/api/${videoId}/register-comment`, {
    method: "POST",
    data: { text },
  });
};

const fakeAddComment = (text) => {
  const commentsNumber = videoContainer.querySelector(
    ".video-container__comments-number"
  );
  commentsNumber.innerText = Number(commentsNumber.innerText) + 1;

  const commentsArea = videoContainer.querySelector(
    ".video-container__comments"
  );
  const commentContainer = document.createElement("div");
  const commentAvatar = document.createElement("a");
  const commentAvatarImg = document.createElement("img");
  const commentInfo = document.createElement("div");
  const commentCreatorDateBox = document.createElement("div");
  const commentCreator = document.createElement("a");
  const commentCreatorName = document.createElement("span");
  const commentDateContainer = document.createElement("div");
  const commentMonth = document.createElement("span");
  const commentDate = document.createElement("span");
  const commentYear = document.createElement("span");
  const commentText = document.createElement("div");
  const commentControls = document.createElement("div");
  const commentdelete = document.createElement("button");

  commentContainer.classList.add("comment-container");
  commentAvatar.classList.add("creator-avatar");
  commentInfo.classList.add("comment-info");
  commentCreatorDateBox.classList.add("comment-creator-date-box");
  commentCreator.classList.add("comment-creator");
  commentCreatorName.classList.add("comment-creator__name");
  commentDateContainer.classList.add("comment-date");
  commentMonth.classList.add("comment-date__month");
  commentDate.classList.add("comment-date__date");
  commentYear.classList.add("comment-date__year");
  commentText.classList.add("comment-text");
  commentControls.classList.add("comment-controls");
  commentdelete.classList.add("comment-delete");

  const curAvatar = document.querySelector(".video-container__creator-avatar")[
    "src"
  ];
  const curUsername = document.querySelector(".video-container__creator-name")
    .innerHTML;
  const curDate = new Date();
  commentAvatarImg["src"] = curAvatar;
  commentCreatorName.innerHTML = curUsername;
  commentMonth.innerText = curDate.getMonth() + 1;
  commentDate.innerText = curDate.getDate();
  commentYear.innerText = curDate.getFullYear();
  commentText.innerText = text;
  commentdelete.innerText = "refresh to delete";

  commentsArea.prepend(commentContainer);
  commentContainer.appendChild(commentAvatar);
  commentAvatar.appendChild(commentAvatarImg);
  commentContainer.appendChild(commentInfo);
  commentInfo.appendChild(commentCreatorDateBox);
  commentCreatorDateBox.appendChild(commentCreator);
  commentCreator.appendChild(commentCreatorName);
  commentCreatorDateBox.appendChild(commentDateContainer);
  commentDateContainer.appendChild(commentMonth);
  commentDateContainer.appendChild(commentDate);
  commentDateContainer.appendChild(commentYear);
  commentInfo.appendChild(commentText);
  commentInfo.appendChild(commentControls);
  commentControls.appendChild(commentdelete);
};

const handleAddComment = async (event) => {
  event.preventDefault();
  const commentInput = videoContainer.querySelector(
    ".video-container__comment-input"
  );
  if (commentInput.value) {
    sendComment(commentInput.value);
    fakeAddComment(commentInput.value);
    commentInput.value = "";
  }
};

const fakeDeleteComment = (event) => {
  const commentsNumber = videoContainer.querySelector(
    ".video-container__comments-number"
  );
  commentsNumber.innerText = Number(commentsNumber.innerText) - 1;

  const commentContainer = event.target.parentNode.parentNode.parentNode;
  commentContainer.remove();
};

const handleDeleteComment = async (event) => {
  const commentId = event.target.id;
  await axios(`/api/${commentId}/delete-comment`);

  fakeDeleteComment(event);
};

const init = () => {
  const commentForm = videoContainer.querySelector(
    ".video-container__comment-form"
  );
  commentForm.addEventListener("submit", handleAddComment);

  const commentDeleteButtons = videoContainer.querySelectorAll(
    ".comment-delete"
  );
  for (let index = 0; index < commentDeleteButtons.length; index++) {
    commentDeleteButtons[index].addEventListener("click", handleDeleteComment);
  }
};

if (videoContainer) {
  init();
}

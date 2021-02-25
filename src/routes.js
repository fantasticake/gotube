// global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//user
const USERS = "/users";
const USER_DETAIL = "/:userId";
const EDIT_PROFILE = "/:userId/edit-profile";
const CHANGE_PASSWORD = "/:userId/change-password";

//video
const VIDEOS = "/videos";
const UPLOAD_VIDEO = "/upload-video";
const VIDEO_DETAIL = "/:videoId";
const EDIT_VIDEO = "/:videoId/edit-video";
const DELETE_VIDEO = "/:videoId/delete-video";

//google
const GOOGLE_LOGIN = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

//github
const GITHUB_LOGIN = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//facebook
const FACEBOOK_LOGIN = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

//api
const API = "/api";
const REGISTER_VIEW = "/:videoId/register-view";
const REGISTER_COMMENT = "/:videoId/register-comment";
const DELETE_COMMENT = "/:commentId/delete-comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  userDetail: function (userId) {
    if (userId) {
      return `/${userId}`;
    }
    return USER_DETAIL;
  },
  editProfile: function (userId) {
    if (userId) {
      return `/${userId}/edit-profile`;
    }
    return EDIT_PROFILE;
  },
  changePassword: function (userId) {
    if (userId) {
      return `/${userId}/change-password`;
    }
    return CHANGE_PASSWORD;
  },

  videos: VIDEOS,
  uploadVideo: UPLOAD_VIDEO,
  videoDetail: function (videoId) {
    if (videoId) {
      return `/${videoId}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: function (videoId) {
    if (videoId) {
      return `/${videoId}/edit-video`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: function (videoId) {
    if (videoId) {
      return `/${videoId}/delete-video`;
    }
    return DELETE_VIDEO;
  },

  googleLogin: GOOGLE_LOGIN,
  googleCallback: GOOGLE_CALLBACK,

  githubLogin: GITHUB_LOGIN,
  githubCallback: GITHUB_CALLBACK,

  facebookLogin: FACEBOOK_LOGIN,
  facebookCallback: FACEBOOK_CALLBACK,

  api: API,
  registerView: REGISTER_VIEW,
  registerComment: REGISTER_COMMENT,
  deleteComment: DELETE_COMMENT,
};

export default routes;

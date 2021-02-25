import express from "express";
import {
  handleHome,
  handleGetJoin,
  handlePostJoin,
  handleGetLogin,
  handlePostLogin,
  handleGoogleLogin,
  handleGoogleCallback,
  handleGithubLogin,
  handleGithubCallback,
  handleFacebookLogin,
  handleFacebookCallback,
  handleAfterSocialLogin,
  handlelogout,
  handleSearch,
} from "../controllers/globalController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, handleHome);

globalRouter.get(routes.join, onlyPublic, handleGetJoin);
globalRouter.post(routes.join, onlyPublic, handlePostJoin, handlePostLogin);

globalRouter.get(routes.login, onlyPublic, handleGetLogin);
globalRouter.post(routes.login, onlyPublic, handlePostLogin);

globalRouter.get(routes.googleLogin, onlyPublic, handleGoogleLogin);
globalRouter.get(
  routes.googleCallback,
  onlyPublic,
  handleGoogleCallback,
  handleAfterSocialLogin
);

globalRouter.get(routes.githubLogin, onlyPublic, handleGithubLogin);
globalRouter.get(
  routes.githubCallback,
  onlyPublic,
  handleGithubCallback,
  handleAfterSocialLogin
);

globalRouter.get(routes.facebookLogin, onlyPublic, handleFacebookLogin);
globalRouter.get(
  routes.facebookCallback,
  onlyPublic,
  handleFacebookCallback,
  handleAfterSocialLogin
);

globalRouter.get(routes.logout, onlyPrivate, handlelogout);

globalRouter.get(routes.search, handleSearch);

export default globalRouter;

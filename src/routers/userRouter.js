import express from "express";
import {
  handleUserDetail,
  handleGetEditProfile,
  handlePostEditProfile,
  handleGetChangePassword,
  handlePostChangePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userDetail(), handleUserDetail);

userRouter.get(routes.editProfile(), onlyPrivate, handleGetEditProfile);
userRouter.post(
  routes.editProfile(),
  onlyPrivate,
  uploadAvatar,
  handlePostEditProfile
);

userRouter.get(routes.changePassword(), onlyPrivate, handleGetChangePassword);
userRouter.post(routes.changePassword(), onlyPrivate, handlePostChangePassword);

export default userRouter;

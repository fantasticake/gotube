import express from "express";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";
import {
  handleDeleteComment,
  handleRegisterComment,
  handleRegisterView,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, handleRegisterView);

apiRouter.post(routes.registerComment, handleRegisterComment);

apiRouter.get(routes.deleteComment, handleDeleteComment);

export default apiRouter;

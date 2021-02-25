import express from "express";
import {
  handleGetUploadVideo,
  handlePostUploadVideo,
  handleVideoDetail,
  handleGetEditVideo,
  handlePostEditVideo,
  handleGetDeleteVideo,
  handlePostDeleteVideo,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.uploadVideo, onlyPrivate, handleGetUploadVideo);
videoRouter.post(
  routes.uploadVideo,
  onlyPrivate,
  uploadVideo,
  handlePostUploadVideo
);

videoRouter.get(routes.videoDetail(), handleVideoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, handleGetEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, handlePostEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, handleGetDeleteVideo);
videoRouter.post(routes.deleteVideo(), onlyPrivate, handlePostDeleteVideo);

export default videoRouter;

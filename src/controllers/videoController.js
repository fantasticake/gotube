import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";

export const handleGetUploadVideo = (req, res) => {
  res.render("uploadVideo");
};

export const handlePostUploadVideo = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  try {
    const newVideo = await Video.create({
      path,
      title,
      description,
      creator: req.user.id,
    });
    const user = await User.findById(req.user.id);
    user.videos.push(newVideo.id);
    await User.findByIdAndUpdate(req.user.id, user);
    res.redirect(`/videos${routes.videoDetail(newVideo.id)}`);
  } catch (error) {
    console.log(error);
    res.render("uploadVideo");
  }
};

export const handleVideoDetail = async (req, res) => {
  const {
    params: { videoId },
  } = req;

  const video = await Video.findById(videoId)
    .populate("creator")
    .populate({
      path: "comments",
      populate: {
        path: "creator",
      },
    });

  res.render("videoDetail", { video });
};

export const handleGetEditVideo = async (req, res) => {
  const {
    params: { videoId },
  } = req;
  try {
    const video = await Video.findById(videoId);
    res.render("editVideo", { video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const handlePostEditVideo = async (req, res) => {
  const {
    params: { videoId },
    body: { title, description },
  } = req;

  try {
    await Video.findByIdAndUpdate(videoId, { title, description });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`/videos${routes.videoDetail(videoId)}`);
  }
};

export const handleGetDeleteVideo = (req, res) => {
  const {
    params: { videoId },
  } = req;

  res.render("deleteVideo", { videoId });
};

export const handlePostDeleteVideo = async (req, res) => {
  const {
    params: { videoId },
  } = req;

  try {
    await Video.findByIdAndDelete(videoId);
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

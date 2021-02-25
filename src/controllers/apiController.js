import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const handleRegisterView = async (req, res) => {
  const {
    params: { videoId },
  } = req;

  try {
    const video = await Video.findById(videoId);
    video.views += 1;
    await Video.findByIdAndUpdate(videoId, video);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const handleRegisterComment = async (req, res) => {
  const {
    params: { videoId },
    body: { text },
  } = req;

  try {
    const user = await User.findById(req.user.id);
    const video = await Video.findById(videoId);
    const newComment = await Comment.create({
      text,
      creator: user.id,
      video: videoId,
    });
    user.comments.push(newComment.id);
    video.comments.push(newComment.id);
    await Video.findByIdAndUpdate(videoId, video);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const handleDeleteComment = async (req, res) => {
  const {
    params: { commentId },
  } = req;

  try {
    const comment = await Comment.findById(commentId);
    const video = await Video.findById(comment.video);
    const index = video.comments.indexOf(commentId);
    video.comments.splice(index, 1);
    await Video.findByIdAndUpdate(comment.video, video);
    await Comment.findByIdAndDelete(commentId);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

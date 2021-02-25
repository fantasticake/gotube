import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  path: {
    type: String,
    required: "file path is required",
  },
  title: {
    type: String,
    required: "title is required",
  },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "creator is required",
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const videoModel = mongoose.model("Video", VideoSchema);
export default videoModel;

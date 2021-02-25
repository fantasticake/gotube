import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "username is required",
  },
  email: {
    type: String,
    required: "email is required",
  },
  local: {
    type: Boolean,
    default: false,
  },
  avatarUrl: String,
  googleId: Number,
  githubId: Number,
  facebookId: Number,
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const userModel = mongoose.model("User", UserSchema);
export default userModel;

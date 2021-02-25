import Video from "../models/Video";
import User from "../models/User";
import routes from "../routes";
import passport from "passport";
import { localsMiddleware } from "../middlewares";

export const handleHome = async (req, res) => {
  try {
    const videos = await Video.find({}).populate("creator");
    res.render("home", { videos });
  } catch (error) {
    console.log(error);
    res.render("home", { videos: [] });
  }
};

export const handleGetLogin = (req, res) => {
  res.render("login");
};

export const handlePostLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const handleAfterSocialLogin = (req, res) => {
  res.redirect(routes.home);
};

export const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const handleGoogleCallback = passport.authenticate("google", {
  failureRedirect: routes.login,
});

export const googleAuthenticate = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { sub: id, name, email, picture: avatarUrl },
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      await User.findOneAndUpdate({ email });
      cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        avatarUrl,
        googleId: id,
      });
      cb(null, newUser);
    }
  } catch (error) {
    console.log(error);
    cb(error);
  }
};

export const handleGithubLogin = passport.authenticate("github");

export const handleGithubCallback = passport.authenticate("github", {
  failureRedirect: routes.login,
});

export const githubAuthenticate = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    _json: { id, login: name, avatar_url: avatarUrl, email },
  } = profile;

  console.log(profile);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      await User.findOneAndUpdate({ email });
      done(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        avatarUrl,
        githubId: id,
      });
      done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    done(error);
  }
};

export const handleFacebookLogin = passport.authenticate("facebook", {
  scope: ["email"],
});

export const handleFacebookCallback = passport.authenticate("facebook", {
  failureRedirect: routes.login,
});

export const facebookAuthenticate = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  const {
    id,
    profileUrl: avatarUrl,
    _json: { email, first_name, last_name },
  } = profile;
  const name = first_name.concat(" ", last_name);

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      await User.findOneAndUpdate({ email });
      done(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        avatarUrl,
        facebookId: id,
      });
      done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    done(error);
  }
};

export const handlelogout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const handleGetJoin = (req, res) => {
  res.render("join");
};

export const handlePostJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password == password2) {
    try {
      const newUser = await User({
        name,
        email,
        local: true,
      });
      await User.register(newUser, password);
      next();
    } catch (error) {
      console.log(error);
      res.render("join");
    }
  } else {
    res.status(400);
    res.render("join");
  }
};

export const handleSearch = async (req, res) => {
  const {
    query: { searchingBy },
  } = req;

  try {
    const videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }).populate("creator");
    res.render("search", { videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

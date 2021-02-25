import User from "../models/User";
import routes from "../routes";

export const handleUserDetail = async (req, res) => {
  const {
    params: { userId },
  } = req;

  try {
    const user = await User.findById(userId).populate("videos");
    res.render("userDetail", { user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const handleGetEditProfile = (req, res) => {
  res.render("editProfile");
};

export const handlePostEditProfile = async (req, res) => {
  const {
    body: { name },
    file: { path },
    user: { id },
  } = req;

  try {
    await User.findByIdAndUpdate(id, { name, avatarUrl: `/${path}` });
    res.redirect(`/users${routes.userDetail(id)}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/users${routes.editProfile(id)}`);
  }
};

export const handleGetChangePassword = (req, res) => {
  res.render("changePassword");
};

export const handlePostChangePassword = async (req, res) => {
  const {
    body: { password, newPassword, newPassword2 },
    user: { id },
  } = req;

  if (newPassword == newPassword2) {
    try {
      await req.user.changePassword(password, newPassword);
      res.redirect(`/users${routes.userDetail(id)}`);
    } catch (error) {
      console.log(error);
      res.render("changePassword");
    }
  } else {
    res.status(400);
    res.render("changePassword");
  }
};

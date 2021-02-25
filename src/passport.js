import passport from "passport";
import GitHubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import googleStrategy from "passport-google-oauth20";
import User from "./models/User";
import dotenv from "dotenv";
import routes from "./routes";
import {
  facebookAuthenticate,
  githubAuthenticate,
  googleAuthenticate,
} from "./controllers/globalController";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.SITE_URL}${routes.googleCallback}`,
    },
    googleAuthenticate
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${process.env.SITE_URL}${routes.githubCallback}`,
    },
    githubAuthenticate
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `${process.env.SITE_URL}${routes.facebookCallback}`,
      profileFields: ['id', 'displayName', 'profileUrl', 'email'];
    },
    facebookAuthenticate
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

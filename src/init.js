import "@babel/polyfill";
import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT;

const handleServer = () => {
  console.log("✅ Started server!");
};

app.listen(PORT, handleServer);

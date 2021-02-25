import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleDBOpen = () => {
  console.log("✅ connected to db!");
};

const handleDBError = (error) => {
  console.log(`❌ error: ${error}`);
};

db.once("open", handleDBOpen);
db.on("error", handleDBError);

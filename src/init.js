require("dotenv").config();
import "@babel/polyfill";
import "./db";
import app from "./app";

const PORT = process.env.PORT;

const handleServer = () => {
  console.log(`✅ Started server on http://localhost:${PORT}`);
};

app.listen(PORT, handleServer);

import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongo = mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongo;
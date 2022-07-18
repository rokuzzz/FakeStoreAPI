import logger from "jet-logger";
import server from "./server";
import mongodb from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const URI: string = process.env.SHOP_DB_URI as string;
const port: string = process.env.PORT as string;

mongoose
  .connect(`${URI}`)
  .then(() => {
    server.listen(server.get("port"), () =>
      console.log(`app is up and running in port ${server.get("port")}`)
    );
  })
  .catch((e) => {
    console.log("DB connect error");
    process.exit(1);
  });
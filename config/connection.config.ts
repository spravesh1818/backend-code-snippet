import mongoose from "mongoose";
import * as dotenv from "dotenv";
import log from "loglevel";

import cred from "./credentials.config";

dotenv.config();

const MONGO_URI = cred.mongoURI;
log.info(`The connection uri is: ${MONGO_URI}`);

const connectToMongoDb = () => {
  const connection = mongoose.connect(MONGO_URI);

  mongoose.connection.on("connected", () => {
    log.info("MongoDb connected.");
  });
  mongoose.connection.on("error", (err) => {
    log.error(`An error occurred. ERROR: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    log.error("MongoDb disconnected!");
  });

  return connection;
};

export default connectToMongoDb;

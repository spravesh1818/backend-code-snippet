import * as dotenv from "dotenv";
import mongoose from "mongoose";
import log from "loglevel";

import User from "../src/core/models/users.model";
import connection from "../Config/connection.config";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

const data = [
  {
    name: "Pravesh Chapagain",
    email: "spravesh1818@gmail.com",
  },
  {
    name: "Bishal Jarnal",
    email: "bishal.jarnal@gmail.com",
  },
];

async function seedUserCollection() {
  await connection();

  try {
    User.collection.drop();
    User.insertMany(data).then((result) => {
      log.info(`Seed successfull: \n ${result}`);
      mongoose.connection.close();
    });
  } catch (err) {
    log.info(err);
  }
}

seedUserCollection();

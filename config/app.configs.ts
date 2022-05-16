import * as dotenv from "dotenv";

dotenv.config();

export default {
  host: process.env.APP_HOST || "localhost",
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV,
};

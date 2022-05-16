import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import log from "loglevel";

import key from "./config/credentials.config";
import routes from "./src/routes/routes";
import appConfig from "./config/app.config";
import connection from "./config/connection.config";
import swaggerDocs from "./config/swagger.config";
import genericErrorHandler from "./src/middlewares/errorHandlers/genericErrorHandler";

const port = appConfig.port;
const app = express();
const dbURI = key.mongoURI;

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", routes);
log.info(`MONGO:: Connection uri: ${dbURI}`);

app.use(genericErrorHandler);
connection()
  .then(() => {
    app.listen(port, () => log.info(`Server started at port: ${port}`));
  })
  .catch((err: any) => {
    log.error(`MONGO:: Connection failed, err ${err}`);
  });

export default app;

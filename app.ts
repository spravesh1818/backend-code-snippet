import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import key from "./Config/credentials";
import routes from "./src/routes/routes";
import appConfig from "./Config/app.configs";
import connection from "./Config/connection.config";
import swaggerDocs from "./Config/swagger.config";
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
console.log(`MONGO:: Connection uri: ${dbURI}`);

app.use(genericErrorHandler);
connection()
  .then((_res) => {
    app.listen(port, () => console.log(`Server started at port: ${port}`));
  })
  .catch((err) => {
    console.log(`MONGO:: Connection failed, err ${err}`);
  });

export default app;

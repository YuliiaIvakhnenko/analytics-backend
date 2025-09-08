import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Express } from "express";
import path from "path";

const specs = YAML.load(path.join(__dirname, "swagger.yml"));



export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

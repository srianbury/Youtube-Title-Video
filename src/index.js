import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import * as Sentry from "@sentry/node";
import routes from "./routes";

dotenv.config();

const app = express();
if (process.env.NODE_ENV === "production") {
  // console.log("initializing logger");
  Sentry.init({ dsn: process.env.SENTRY_URL });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());
  // app.use(logger); // replaced with sentry's middleware
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// application routes
app.use(routes.main.path, routes.main);

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);

export default app;

import { Router, Request, Response } from "express";
import * as express from "express";
import mongoose from "mongoose";
import employeeRoute from "./routes/employeeRoute";

const app = express();

async function bootstrap() {
  app.use(express.json());

  try {
    await mongoose.connect("mongodb://root:password@localhost:27017");
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }

  app.use("/api", employeeRoute);

  app.listen(3333, () => console.log("server running on port 3333"));
}

bootstrap();
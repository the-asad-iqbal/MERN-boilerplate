import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

import { validateEnv } from "./src/lib/utils.js";
import dbConfig from "./src/config/dbConfig.js";
import userRoute from "./src/routes/userRoute.js";
import authRoute from "./src/routes/authRoute.js";
import errorHandler from "./src/middleware/errorHandler.js";

config();
validateEnv();
dbConfig();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);

// Error handler middleware (should be last)
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server🏃on [${process.env.PORT || 3000}]`);
});

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const { createUser, createLogin } = require("./controllers/users");
const {
  validateCreateUser,
  validateUserLogin,
} = require("./middlewares/validation");
const errorHandler = require("./middlewares/error-handler");
require("dotenv").config();

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((e) => console.error(e));

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateUserLogin, createLogin);

app.post("/signup", validateCreateUser, createUser);

app.get("/", (req, res) => {
  res.json({ message: "API is live!" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    uptime: process.uptime(),
    service: "wear-wtwr backend",
    version: "2025-07-21-production",
  });
});

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

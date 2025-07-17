const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const { createUser, createLogin } = require("./controllers/users");
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

app.post("/signin", createLogin);

app.post("/signup", createUser);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

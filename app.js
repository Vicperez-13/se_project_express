const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { createUser, createLogin, updateUser } = require("./controllers/users");
const authorization = require("./middlewares/auth.js");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((e) => console.error(e));

app.use(express.json());

app.post("/signin", createLogin);

app.post("/signup", createUser);

app.use(authorization);

app.patch("/users/me", updateUser);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

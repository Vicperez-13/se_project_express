const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../errors");

const createLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || "default value",
        {
          expiresIn: "7d",
        }
      );
      res.status(200).send({
        token,
        user: {
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.message === "AuthenticationError") {
        next(new UnauthorizedError("Invalid email or password"));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.create({
    name,
    avatar,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || "default value",
        {
          expiresIn: "7d",
        }
      );
      res.status(201).send({
        token,
        user: {
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("User already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  createLogin,
  updateUser,
};

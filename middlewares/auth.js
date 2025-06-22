const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { UNAUTHORIZED } = require("../utils/errors");

function authorization(req, res, next) {
  try {
    const { authorization: authHeader } = req.headers;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(UNAUTHORIZED).send({ message: "Unauthorized" });
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    if (
      err.name === "DocumentNotFoundError" ||
      err.name === "JsonWebTokenError"
    ) {
      return res.status(UNAUTHORIZED).send({ message: "Unauthorized" });
    }
    next(err);
  }
}

module.exports = authorization;

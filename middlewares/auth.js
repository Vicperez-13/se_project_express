const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../errors");

function authorization(req, res, next) {
  try {
    const { authorization: authHeader } = req.headers;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Unauthorized"));
    }
    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    if (
      err.name === "DocumentNotFoundError" ||
      err.name === "JsonWebTokenError"
    ) {
      return next(new UnauthorizedError("Unauthorized"));
    }
    return next(err);
  }
}

module.exports = authorization;

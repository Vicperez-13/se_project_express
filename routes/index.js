const router = require("express").Router();
const clothingItem = require("./clothingItems");
const { NotFoundError } = require("../errors");

const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;

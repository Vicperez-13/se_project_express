const router = require("express").Router();
const { updateUser, getCurrentUser } = require("../controllers/users");
const authorization = require("../middlewares/auth");

router.get("/me", authorization, getCurrentUser);
router.patch("/me", authorization, updateUser);

module.exports = router;

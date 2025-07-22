const router = require("express").Router();
const { updateUser, getCurrentUser } = require("../controllers/users");
const authorization = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");

router.get("/me", authorization, getCurrentUser);
router.patch("/me", authorization, validateUpdateUser, updateUser);

module.exports = router;

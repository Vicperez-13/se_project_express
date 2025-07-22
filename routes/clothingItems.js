const router = require("express").Router();
const { addLike, removeLike } = require("../controllers/clothingItems");
const authorization = require("../middlewares/auth");
const { validateCreateItem, validateId } = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

router.post("/", authorization, validateCreateItem, createItem);
router.get("/", getItems);
router.delete("/:itemId", authorization, validateId, deleteItem);
router.put("/:itemId/likes", authorization, validateId, addLike);
router.delete("/:itemId/likes", authorization, validateId, removeLike);

module.exports = router;

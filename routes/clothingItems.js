const router = require("express").Router();
const { addLike, removeLike } = require("../controllers/clothingItems");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

// CRUD

// CREATE
router.post("/", createItem);

// READ

router.get("/", getItems);

// DELETE
router.delete("/:itemId", deleteItem);

// Like an item
router.put("/:itemId/likes", addLike);

// Unlike an item
router.delete("/:itemId/likes", removeLike);

module.exports = router;

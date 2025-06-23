const router = require("express").Router();
const { addLike, removeLike } = require("../controllers/clothingItems");
const authorization = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

// CRUD

// CREATE
router.post("/", authorization, createItem);

// READ

router.get("/", getItems);

// DELETE
router.delete("/:itemId", authorization, deleteItem);

// Like an item
router.put("/:itemId/likes", authorization, addLike);

// Unlike an item
router.delete("/:itemId/likes", authorization, removeLike);

module.exports = router;

const clothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const addLike = (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;
  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(NOT_FOUND).send({ message: err.message });
    });
};
const removeLike = (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;
  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res.status(NOT_FOUND).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  clothingItem
    .findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({}))
    .catch((err) => {
      res.status(BAD_REQUEST).send({ message: err.message });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  addLike,
  removeLike,
};

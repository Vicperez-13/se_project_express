const { SOME_ERROR_CODE } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body; // destructure name and avatar from request body

  User.create({ name, avatar }) // arguments omitted
    .then((user) => res.status(201).send(user)) // handle successful request
    .catch((err) => {
      console.error(err);
      if (err.name === "SomeErrorName") {
        return res
          .status(SOME_ERROR_CODE)
          .send({ message: "Appropriate error message" });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};

exports.createUser = createUser;

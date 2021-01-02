const { schemas } = require("./schemas/users");

const validateCreate = (req, res, next) => {
  const { error, value } = schemas.create.validate(req.body);
  error ? res.status(422).json({ message: "error" }) : next();
};

module.exports = { validateCreate };

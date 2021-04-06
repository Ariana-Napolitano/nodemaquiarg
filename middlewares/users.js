const { schemas } = require("./schemas/users");
const { pool } = require("./../utils/db");

const validateCreate = async (req, res, next) => {
  const mail = await (await pool())
    .collection("usuarios")
    .findOne({ mail: req.body.mail });
  if (mail) return res.status(422).json({ message: "Este email ya existe" });
  const { error, value } = schemas.create.validate(req.body);
  error ? res.status(400).json({ message: "error" }) : next();
};

module.exports = { validateCreate };

var express = require("express");
var router = express.Router();
const model = require("./../models/productos");

const all = async (req, res) =>
  model
    .get({ conditions: {}, fields: {} })
    .then((response) => res.json(response))
    .catch((e) => res.sendStatus(500));

const single = (req, res) =>
  model
    .findById(req.params.id)
    .then(([response]) => res.json(response))
    .catch((e) => res.sendStatus(500));

const create = (req, res) =>
  model
    .create(req.body)
    .then(({ insertId }) => res.json(insertId))
    .catch((e) => res.sendStatus(500));

router.get("/", all);
router.get("/:id", single);
router.post("/create", create);

module.exports = router;

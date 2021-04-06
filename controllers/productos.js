var express = require("express");
var router = express.Router();
const model = require("./../models/productos");
const { isAdmin } = require("./../models/auth");

const all = async (req, res) => {
  try {
    const results = await model.getList(req.query.categoria);
    console.log(results);
    return res.json(results);
  } catch (e) {
    res.status(500).json(e);
  }
};

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
router.post("/", isAdmin, create);

module.exports = router;

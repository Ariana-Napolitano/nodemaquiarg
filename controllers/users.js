var express = require("express");
const { validateCreate } = require("../middlewares/users");
const { create } = require("./../models/users");
var router = express.Router();

const confirm = (req, res) =>
  service
    .update({ obj: { habilitado: true }, confirmacionCorreo: req.params.uuid })
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json(e));

router.get("/confirm/:uuid", confirm);

router.post("/create", validateCreate, create);

module.exports = router;

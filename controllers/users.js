var express = require("express");

const model = require("./../models/users");
const { update } = require("../models/carrito");

var router = express.Router();

const confirm = (req, res) =>
  model
    .confirmUser(req.params.uuid)
    .then((response) => res.json(response))
    .catch((e) => res.sendStatus(500));

router.get("/confirm/:uuid", confirm);

//router.post("/create", validateCreate, create);
router.put("/:id/carrito", async (req, res) => {
  if (!req.body.carrito) {
    res.status(400).json({
      message: "El carrito está vacio",
    });
  }
  try {
    const carrito = await update(req.params.id, req.body.carrito);
    res.status(200).json({
      message: "Carrito actualizado",
    });
  } catch (e) {
    res.status(500).json({
      message: "Se rompio todo",
    });
  }
});

module.exports = router;

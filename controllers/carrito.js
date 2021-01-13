const express = require("express");
const router = express.Router();
const { update } = require("./../models/carrito");

router.put("/:id", (req, res) => {
  if (!req.body.carrito) {
    res.status(400).json({
      message: "El carrito está vacio",
    });
  }
  try {
    const carrito = update(req.params.id, req.body.carrito);
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

var express = require("express");
var router = express.Router();
const { create } = require("../models/users");
const { validateCreate } = require("../middlewares/users");
const { pool } = require("./../utils/db");

router.post("/", validateCreate, async (req, res) => {
  try {
    const { nombre, apellido, mail, password, direccionEnvio } = req.body;
    /* { direccion, cuidad, provincia, cp } = req.body;
    const direccionEnvio = { direccion, cuidad, provincia, cp };*/
    const object = {
      nombre,
      apellido,
      mail,
      password,
      direccionEnvio,
    };

    const role = await (await pool())
      .collection("roles")
      .findOne({ name: "user" });
    object.role = await role.name;

    const result = await create(object);
    console.log(result);
    /*res.redirect("/login");*/
    res.status(200).json(object);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

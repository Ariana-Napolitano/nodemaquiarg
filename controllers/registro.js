var express = require("express");
var router = express.Router();
const { create } = require("../models/users");

router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, mail, password } = req.body;
    const { direccion, cuidad, provincia, cp } = req.body;
    const direccionEnvio = { direccion, cuidad, provincia, cp };
    const object = {
      nombre,
      apellido,
      mail,
      password,
      direccionEnvio,
    };
    const result = await create(object);
    console.log(result);
    /*res.redirect("/login");*/
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

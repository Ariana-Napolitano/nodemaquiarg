var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, mail, password, direccionEnvio } = req.body;
    const object = {
      nombre: "",
      apellido: "",
      mail: "",
      password: "",
      direccionEnvio: {
        direccion: "",
        ciudad: "",
        provincia: "",
        cp: "",
      },
    };
    /*const result = await create(object);
    console.log(`El insert id retornado es : ${result}`);
    res.redirect("/login");*/
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

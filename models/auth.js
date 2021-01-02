const bd = require("./../utils/db");

const authenticate = (usuario, password) =>
  bd("usuarios")
    .where({ usuario, password })
    .select("id", "usuario", "habilitado");
// return []
// return [{}]
module.exports = { authenticate };

const { pool } = require("./../utils/db");

const authenticate = async (mail, password) => {
  try {
    return (await pool()).collection("usuarios").findOne({
      $and: [
        { mail: { $eq: mail } },
        { password: { $eq: password } },
        { habilitado: { $eq: true } },
      ],
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
// return []
// return [{}]
module.exports = { authenticate };

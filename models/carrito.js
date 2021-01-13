const { pool } = require("./../utils/db");
const { ObjectID } = require("mongodb");

const update = async (idUsuario, listaObj) => {
  try {
    /*listaObj.map((elemento) => {
      const { id } = elemento;
      return {
        _id: ObjectID(id),
      };
    });*/

    const [_id] = (await pool())
      .collection("usuarios")
      .updateOne({ _id: `ObjectId(${idUsuario})` }, { $set: `${listaObj}` }); // [4]
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { update };

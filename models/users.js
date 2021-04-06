const { pool } = require("./../utils/db");
const { ObjectId } = require("mongodb");
const { v4: uuid } = require("uuid");
const sha1 = require("sha1");
const { send } = require("./../services/mail");
const USUARIOS_COLLECTION = "usuarios";

const getList = async ({
  conditions = {},
  projection = {},
  sort = {},
  limit = 50,
}) => {
  try {
    console.log(conditions);
    return (await pool())
      .collection(USUARIOS_COLLECTION)
      .find(conditions, { projection })
      .sort(sort)
      .limit(limit)
      .toArray();
  } catch (e) {
    throw e;
  }
};

const create = async (obj) => {
  try {
    const { nombre, apellido, mail, direccionEnvio, password, role } = obj;

    const persona = { nombre, apellido, mail, direccionEnvio };
    const result = await (await pool())
      .collection("personas")
      .insertOne(persona); // [4]
    const user = {
      mail,
      password: sha1(password),
      idPersona: result.insertedId,
      confirmacionCorreo: uuid(),
      carrito: [],
      habilitado: false,
      role,
    };

    const idUsuario = await (await pool())
      .collection("usuarios")
      .insertOne(user);
    //return idUsuario;
    // envie un mail

    const messageId = await send({
      to: user.mail,
      subject: "Gracias por registrate",
      html: `Envio de link unico para validar cuenta http://localhost:3000/confirm/${user.confirmacionCorreo}`,
    });
    return user;
  } catch (e) {
    console.log(e);
  }
};

const findById = async (_id) => {
  try {
    (await pool()).collection(USUARIOS_COLLECTION).find(ObjectId(_id));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

/*const logg = async (mail, password) => {
  try {
    (await pool()).collection(USUARIOS_COLLECTION).find(mail, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
*/
const modifyById = async (id, obj) =>
  (await pool())
    .collection(USUARIOS_COLLECTION)
    .updateOne({ _id: `ObjectId(${id})` }, { $set: `${obj}` });

const confirmUser = async (uuid) =>
  (await pool())
    .collection(USUARIOS_COLLECTION)
    .updateOne(
      { confirmacionCorreo: `${uuid}` },
      { $set: { habilitado: true } }
    );

module.exports = { getList, create, findById, modifyById, confirmUser };

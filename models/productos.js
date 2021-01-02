const { pool, ObjectId } = require("./../utils/db");
const PRODUCTOS_COLLECTION = "productos";

const getList = async ({
  conditions = {},
  projection = {},
  sort = {},
  limit = 50,
}) => {
  try {
    console.log(conditions);
    return (await pool())
      .collection(PRODUCTOS_COLLECTION)
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
    const { nombre, precio, descripcion, color, marca, stock, categoria } = obj;

    const producto = {
      nombre,
      precio,
      descripcion,
      color,
      marca,
      stock,
      categoria,
    };
    const [_id] = (await pool()).collection("productos").insertOne(producto); // [4]

    return producto;
  } catch (e) {
    console.log(e);
  }
};

const findById = async (_id) => {
  try {
    (await pool()).collection(PRODUCTOS_COLLECTION).find(ObjectId(_id));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const modifyById = async (id, obj) =>
  (await pool())
    .collection(PRODUCTOS_COLLECTION)
    .updateOne({ _id: `ObjectId(${id})` }, { $set: `${obj}` });
module.exports = { getList, create, findById, modifyById };

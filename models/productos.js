const e = require("express");
const { pool } = require("./../utils/db");
const { ObjectId } = require("mongodb");
const { imgFile } = require("../utils/fileHandler");

const PRODUCTOS_COLLECTION = "productos";

const getList = async (categoria) => {
  try {
    return (await pool())
      .collection(PRODUCTOS_COLLECTION)
      .find({ categoria: { $eq: categoria } })
      .sort({ nombre: 1 })
      .project({ nombre: 1, descripcion: 1, precio: 1, imagen: 1, stock: 1 })

      .toArray();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

/*getProducto = async (id) => {
  try {
    return (await pool()).collection(PRODUCTOS_COLLECTION).findOne({ id });
  } catch (error) {
    console.log(error);
    throw e;
  }
};*/

const create = async (obj) => {
  try {
    const handledImage = await imgFile(req.file);
    const {
      nombre,
      precio,
      descripcion,
      colores: [{}],
      marca,
      categorias: [],
    } = req.body;
    const {
      nombre,
      precio,
      descripcion,
      colores: [{}],
      marca,
      categorias: [],
      imagen: handledImage,
    } = obj;

    const producto = {
      nombre,
      precio,
      descripcion,
      colores: [{}],
      marca,
      categorias: [],
      imagen: handledImage,
    };
    const _id = await (await pool())
      .collection("productos")
      .insertOne(producto); // [4]

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

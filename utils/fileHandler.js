const fs = require("fs");
const { v4: uuid } = require("uuid");
const allowImageExtension = ["png", "jpeg"];

const saveFile = (
  { mimetype, path, size },
  allowExtension,
  destFolder = "./public/images"
) => {
  try {
    const [type, extension] = mimetype.split("/"); // [image, png]
    if (!allowExtension.includes(extension)) throw "Formato no permitido";
    const uid = uuid();
    const fileName = `${uid}.${extension}`;
    const fileNameOut = `${destFolder}/${fileName}`;
    fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
    fs.unlink(path, (e) => {
      if (e) throw "No se pudo borrar el archivo temporal";
    });
    return uid;
  } catch (e) {
    throw e;
  }
};

const imgFile = (file) => {
  return saveFile(file, allowImageExtension);
};

module.exports = { imgFile };

const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { uploadFiles } = require("../helpers");

const { User, Product } = require("../models");

const uploadFile = async (req, res = response) => {
  try {
    // Imagenes
    // const nombre = await uploadFiles( req.files, undefined, "test");
    const nombre = await uploadFiles(req.files, undefined, "images");
    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const updateFile = async (req, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`,
        });
      }
      break;
    case "product":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Es modelo no es valido",
      });
      break;
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads/",
      collection,
      modelo.img,
    );

    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }
  const nombre = await uploadFiles(req.files, undefined, collection);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

const updateFileCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`,
        });
      }
      break;
    case "product":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Es modelo no es valido",
      });

      break;
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    const imagenBorrar = modelo.img.split("/");
    const nombre = imagenBorrar[imagenBorrar.length - 1];
    const [public_id] = nombre.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;

  await modelo.save();

  res.json(modelo);
};

const getFile = async (req, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case "user":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`,
        });
      }
      break;
    case "product":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Es modelo no es valido",
      });
      break;
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads/",
      collection,
      modelo.img,
    );

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, "../assets/", "no-image.jpg");
  res.sendFile(pathImagen);
};
module.exports = {
  uploadFile,
  updateFile,
  getFile,
  updateFileCloudinary,
};

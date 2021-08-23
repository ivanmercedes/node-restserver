const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
// const User = require("../models/user");
const { Category, User, Product } = require("../models/");

const coleccionesPermitidas = ["categories", "products", "users", "roles"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // true

  if (esMongoID) {
    const usuario = await User.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const usuarios = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  return res.json({
    results: usuarios,
  });
};

const buscarCategoria = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // true

  if (esMongoID) {
    const categoria = await Category.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const categoria = await Category.find({ name: regex, status: true });

  return res.json({
    results: categoria,
  });
};

const buscarProducto = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // true

  if (esMongoID) {
    const products = await Product.findById(termino).populate(
      "category",
      "name",
    );
    return res.json({
      results: products ? [products] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ status: true }],
  }).populate("category", "name");

  return res.json({
    results: products,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!coleccionesPermitidas.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (collection) {
    case "categories":
      buscarCategoria(term, res);
      break;
    case "products":
      buscarProducto(term, res);
      break;
    case "users":
      buscarUsuario(term, res);
      break;

    default:
      res.status(500).json({
        msg: "Este tipo de busqueda aun no esta disponible",
      });
      break;
  }
};

module.exports = {
  search,
};
